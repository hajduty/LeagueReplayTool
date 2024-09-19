import { Keybind, KeybindChannels } from "../../electron/keybinds/types"
import Tooltip from "./Tooltip"
import { ReactNode, useEffect, useState } from "react"

interface Props {
  onClick: () => void;
  content: ReactNode;
  tooltip: string;
  keybindChannel: KeybindChannels;
}

export const Button: React.FC<Props> = ({ onClick, content, tooltip, keybindChannel }) => {

	const [bind, setBind] = useState<string>("Not set");

	useEffect(() => {
		const fetchKeybind = async () => {
			const result: Keybind = await window.ipcRenderer.invoke("get-keybind", keybindChannel);
			setBind(result.bind);
		};
		fetchKeybind();
	}, [keybindChannel]);

	return (
		<Tooltip content={`${tooltip}: ${bind}`}>
			<button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
				onClick={onClick}>
				{content}
			</button>
		</Tooltip>
	)
}