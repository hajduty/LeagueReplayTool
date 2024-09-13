import { IconKeyframe, IconVectorBezier2, IconSquareRoundedMinus, IconTrash, IconEyeCog, IconScanEye, IconKeyframeAlignCenter, IconWindowMinimize, IconKeyboard } from "@tabler/icons-react";
import { Button } from "../../Shared/Button";

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
	return (
		<>
			<div className="space-x-20 flex flex-row">
				<span className="space-x-4 flex flex-row">
					<Button onClick={() => addKeyframe()} content={<IconKeyframe className="stroke-gold4 w-4"></IconKeyframe>} tooltip={"Add keyframe"} />
					<Button onClick={() => deleteKeyframe()} content={<IconVectorBezier2 className="stroke-gold4 w-4"></IconVectorBezier2>} tooltip={"Add curves to selected"} />
					<Button onClick={() => deleteKeyframe()} content={<IconSquareRoundedMinus className="stroke-gold4 w-4"></IconSquareRoundedMinus>} tooltip={"Clear selected keyframes"} />
					<Button onClick={() => { setKeyframe([]); window.ipcRenderer.send('post-sequence', {}); }} content={<IconTrash className="stroke-gold4 w-4"></IconTrash>} tooltip={"Clear all keyframes"} />
				</span>
				<span className="space-x-4 flex flex-row">
					<Button onClick={openEnvironment} content={<IconEyeCog className="stroke-gold4 w-4"></IconEyeCog>} tooltip={"Environment settings"} />
					<Button onClick={openVisibility} content={<IconScanEye className="stroke-gold4 w-4"></IconScanEye>} tooltip={"Visibility settings"} />
					<Button onClick={openKeybinds} content={<IconKeyboard className="stroke-gold4 w-4"></IconKeyboard>} tooltip={"Keybinds settings"} />
					<Button onClick={minimizeWindow} content={<IconKeyframeAlignCenter className="stroke-gold4 w-4"></IconKeyframeAlignCenter>} tooltip={"Keyframe settings"} />
				</span>
				<Button onClick={minimizeWindow} content={<IconWindowMinimize className="stroke-gold4 w-4"></IconWindowMinimize>} tooltip={"Minimize window"} />
			</div>
		</>
	)
}