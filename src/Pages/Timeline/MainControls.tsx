import { IconPlayerPlay, IconPlayerPause, IconRewindBackward15, IconArrowUpFromArc, IconArrowDownFromArc, IconMinus, IconPlus } from "@tabler/icons-react";
import { Button } from "../../Shared/Button";

export const MainControls = ({ sendPlayback, timeline, sendSequence, keyframe, sequence, setSequence }: any) => {
	return (
		<>
			<div className="flex flex-row space-x-2 no-drag">
				<Button onClick={() => { sendPlayback({ key: "paused", value: !timeline.paused }) }}
					content={timeline.paused ?
						(<IconPlayerPlay className="stroke-gold4 w-4" />)
						:
						(<IconPlayerPause className="stroke-gold4 w-4" />)
					}
					tooltip={"Resume playback"}
				/>
				<Button onClick={() => { sendPlayback({ key: "time", value: timeline.time - 15 }) }}
					content={<IconRewindBackward15 className="stroke-gold4 w-4"></IconRewindBackward15>}
					tooltip={"Go back 15 seconds"}
				/>

				{sequence ?
					(<Button onClick={() => { window.ipcRenderer.send('post-sequence', {}); setSequence(false); }}
						content={<IconArrowUpFromArc className="stroke-gold4 w-4" />}
						tooltip={"Unapply sequence"} />)
					:
					(<Button onClick={() => { sendSequence(keyframe); }}
						content={<IconArrowDownFromArc className="stroke-gold4 w-4" />}
						tooltip={"Apply sequence"} />)
				}
			</div>
			<div className="flex flex-row space-x-2 no-drag items-center">
				<Button onClick={() => { sendPlayback({ key: "speed", value: Math.max(timeline.speed - 0.25, 0.25).toFixed(2) }) }} content={<IconMinus className="stroke-gold4 w-4"></IconMinus>} tooltip={"Go back 15 seconds"} />
				<Button onClick={() => { sendPlayback({ key: "speed", value: (timeline.speed + 0.25).toFixed(2) }) }} content={<IconPlus className="stroke-gold4 w-4"></IconPlus>} tooltip={"Go back 15 seconds"} />
				<p className="text-grey2 font-semibold text-xs select-none w-8">{timeline.speed}X</p>
			</div>
		</>
	)
}