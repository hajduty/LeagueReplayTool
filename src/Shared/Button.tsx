import { KeybindChannels } from "../../electron/keybinds/types"
import useKeybinds from "../hooks/useKeybinds";
import Tooltip from "./Tooltip"
import { ReactNode } from "react"

interface Props {
  onClick: () => void;
  content: ReactNode;
  tooltip: string;
  keybindChannel: KeybindChannels;
}

export const Button: React.FC<Props> = ({ onClick, content, tooltip, keybindChannel }) => {

	const { keybinds } = useKeybinds();

	return (
		<Tooltip content={`${tooltip}: ${keybinds.find((keybind) => keybind.channel == keybindChannel)?.bind || "Not found"}`}>
			<button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
				onClick={onClick}>
				{content}
			</button>
		</Tooltip>
	)
}