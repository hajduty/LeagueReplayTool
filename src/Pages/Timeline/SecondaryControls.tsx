import { IconKeyframe, IconVectorBezier2, IconSquareRoundedMinus, IconTrash, IconEyeCog, IconScanEye, IconKeyframeAlignCenter, IconWindowMinimize, IconKeyboard } from "@tabler/icons-react";
import { Button } from "../../Shared/Button";
import { useMemo } from "react";
import useKeybinds from "../../hooks/useKeybinds";
import { KeybindChannels } from "../../../electron/keybinds/types";

const openEnvironment = () => {
	window.ipcRenderer.send('open-environment');
};

const openVisibility = () => {
	window.ipcRenderer.send('open-visibility');
};

const openKeybinds = () => {
	window.ipcRenderer.send('open-keybinds');
}

const minimizeWindow = () => {
	window.ipcRenderer.send('minimize');
};

export const SecondaryControls = ({ addKeyframe, deleteKeyframe, setKeyframe }: any) => {	

 	const keybinds = useMemo(() => ({
		[KeybindChannels.OPEN_ENVIRONMENT]: openEnvironment,
		[KeybindChannels.OPEN_VISIBILITY]: openVisibility,
		[KeybindChannels.OPEN_KEYBINDS]: openKeybinds,
		[KeybindChannels.MINIMIZE]: minimizeWindow,
		[KeybindChannels.ADD_KEYFRAME]: addKeyframe,
		[KeybindChannels.DELETE_KEYFRAME]: deleteKeyframe,
	}), [addKeyframe, deleteKeyframe]); 

  useKeybinds(keybinds);
	
	return (
		<>
			<div className="space-x-20 flex flex-row">
				<span className="space-x-4 flex flex-row">
					<Button onClick={() => addKeyframe()} content={<IconKeyframe className="stroke-gold4 w-4"></IconKeyframe>} tooltip={"Add keyframe"} keybindChannel={KeybindChannels.ADD_KEYFRAME}/>
					<Button onClick={() => deleteKeyframe()} content={<IconVectorBezier2 className="stroke-gold4 w-4"></IconVectorBezier2>} tooltip={"Add curves to selected"} keybindChannel={KeybindChannels.DELETE_KEYFRAME}/>
					<Button onClick={() => deleteKeyframe()} content={<IconSquareRoundedMinus className="stroke-gold4 w-4"></IconSquareRoundedMinus>} tooltip={"Clear selected keyframes"} keybindChannel={KeybindChannels.DELETE_KEYFRAME}/>
					<Button onClick={() => { setKeyframe([]); window.ipcRenderer.send('post-sequence', {}); }} content={<IconTrash className="stroke-gold4 w-4"></IconTrash>} tooltip={"Clear all keyframes"} keybindChannel={KeybindChannels.DELETE_KEYFRAME}/>
				</span>
				<span className="space-x-4 flex flex-row">
					<Button onClick={openEnvironment} content={<IconEyeCog className="stroke-gold4 w-4"></IconEyeCog>} tooltip={"Environment settings"} keybindChannel={KeybindChannels.OPEN_ENVIRONMENT}/>
					<Button onClick={openVisibility} content={<IconScanEye className="stroke-gold4 w-4"></IconScanEye>} tooltip={"Visibility settings"} keybindChannel={KeybindChannels.OPEN_VISIBILITY}/>
					<Button onClick={openKeybinds} content={<IconKeyboard className="stroke-gold4 w-4"></IconKeyboard>} tooltip={"Keybinds settings"} keybindChannel={KeybindChannels.OPEN_KEYBINDS}/>
					<Button onClick={minimizeWindow} content={<IconKeyframeAlignCenter className="stroke-gold4 w-4"></IconKeyframeAlignCenter>} tooltip={"Keyframe settings"} keybindChannel={KeybindChannels.MINIMIZE}/>
				</span>
				<Button onClick={minimizeWindow} content={<IconWindowMinimize className="stroke-gold4 w-4"></IconWindowMinimize>} tooltip={"Minimize window"} keybindChannel={KeybindChannels.MINIMIZE}/>
			</div>
		</>
	)
}