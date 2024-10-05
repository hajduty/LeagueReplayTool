import { IconPlayerPlay, IconPlayerPause, IconRewindBackward15, IconArrowUpFromArc, IconArrowDownFromArc, IconMinus, IconPlus } from "@tabler/icons-react";
import { Button } from "../../Shared/Button";
import { useCallback, useMemo } from "react";
import { KeybindChannels } from "../../../electron/keybinds/types";
import useKeybinds from "../../hooks/useKeybinds";

export const MainControls = ({ sendPlayback, timeline, sendSequence, keyframe, sequence, setSequence }: any) => {

	// Maybe problem? Resumed state is causing a potential issue
	const pause = useCallback(() => {
    sendPlayback({ key: "paused", value: !timeline.paused });
	}, [timeline.paused]);

	const rewind = useCallback(() => {
			sendPlayback({ key: "time", value: timeline.time - 15 });
	}, [timeline.time]);

	const applySequence = useCallback(() => {
			if (sequence) {
					window.ipcRenderer.send('post-sequence', {});
					setSequence(false);
			} else {
					sendSequence(keyframe);
			}
	}, [sequence, keyframe]);

	const speedUp = useCallback(() => {
			sendPlayback({ key: "speed", value: (timeline.speed + 0.25).toFixed(2) });
	}, [timeline.speed]);

	const speedDown = useCallback(() => {
			sendPlayback({ key: "speed", value: Math.max(timeline.speed - 0.25, 0.25).toFixed(2) });
	}, [timeline.speed]);

	const keybinds = useMemo(() => ({
		[KeybindChannels.PAUSE]: pause,
		[KeybindChannels.REWIND]: rewind,
		[KeybindChannels.APPLY_SEQUENCE]: applySequence,
		[KeybindChannels.SPEED_UP]: speedUp,
		[KeybindChannels.SPEED_DOWN]: speedDown,
	}), [pause, rewind, applySequence, speedUp, speedDown]);

	useKeybinds(keybinds);

	return (
		<>
			<div className="flex flex-row space-x-2 no-drag">
				<Button onClick={pause}
					content={timeline.paused ?
						(<IconPlayerPlay className="stroke-gold4 w-4" />)
						:
						(<IconPlayerPause className="stroke-gold4 w-4" />)
					}
					tooltip={"Resume playback"}
					keybindChannel={KeybindChannels.PAUSE}
				/>
				<Button onClick={rewind}
					content={<IconRewindBackward15 className="stroke-gold4 w-4" />}
					tooltip={"Go back 15 seconds"}
					keybindChannel={KeybindChannels.REWIND}
				/>

				<Button onClick={applySequence}
					content={sequence ? <IconArrowUpFromArc className="stroke-gold4 w-4" /> : <IconArrowDownFromArc className="stroke-gold4 w-4" />}
					tooltip={sequence ? "Unapply sequence" : "Apply sequence"}
					keybindChannel={KeybindChannels.APPLY_SEQUENCE}
				/>
			</div>
			<div className="flex flex-row space-x-2 no-drag items-center">
				<Button onClick={speedDown} content={<IconMinus className="stroke-gold4 w-4" />} tooltip={"Speed down"} keybindChannel={KeybindChannels.SPEED_DOWN} />
				<Button onClick={speedUp} content={<IconPlus className="stroke-gold4 w-4" />} tooltip={"Speed up"} keybindChannel={KeybindChannels.SPEED_UP} />
				<p className="text-grey2 font-semibold text-xs select-none w-8">{timeline.speed}X</p>
			</div>
		</>
	)
}