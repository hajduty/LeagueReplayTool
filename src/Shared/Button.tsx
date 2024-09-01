import Tooltip from "./Tooltip"
import { ReactNode } from "react"

export const Button: React.FC<{onClick: () => void, content: ReactNode, tooltip: string}> = ({ onClick, content, tooltip }) => {
    return (
        <Tooltip content={tooltip}>
            <button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
                onClick={onClick}>
                {content}
            </button>
        </Tooltip>
    )
}