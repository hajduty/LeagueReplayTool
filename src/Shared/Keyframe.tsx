import { vec3 } from "../Models/Keyframe";
import KeyframeIcon from "./KeyframeIcon";

export interface KeyframeProp {
    blend: string,
    time: number,
    value: vec3,
    position: string,
}

export const KeyframeForm: React.FC<KeyframeProp> = ({ position }: KeyframeProp) => {
    return (
        <>
            <KeyframeIcon style={{ left: position }}
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 flex items-center justify-center text-black">
            </KeyframeIcon>
        </>
    )
};