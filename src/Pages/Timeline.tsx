import { useEffect, useRef, useState } from "react";
import { Keyframe, vec3 } from "../Models/Keyframe";
import { KeyframeForm } from "../Shared/Keyframe";
import KeyframeIcon from "../Shared/KeyframeIcon";
import { IconArrowBack, IconEyeCog, IconKey, IconKeyframe, IconKeyframes, IconPlayerPlay, IconSquareRoundedMinus, IconTrash, IconVectorBezier2 } from "@tabler/icons-react";
import Tooltip from "../Shared/Tooltip";

export const Timeline = () => {
    const [zoom, setZoom] = useState(1);
    const [cursorTime, setCursorTime] = useState(4500);
    const [hoverTime, setHoverTime] = useState(4500);
    const [keyframe, setKeyframe] = useState<Array<Keyframe>>([]);
    const [selectedKeyframe, setSelectedKeyframe] = useState<Keyframe>();
    const timelineRef = useRef(null);
    const startTime = 0;
    const endTime = 2500; // Updated end time
    const timelineLength = endTime - startTime;

    useEffect(() => {
        const handleScroll = (e: any) => {
            if (e.ctrlKey) {
                e.preventDefault();
                if (e.deltaY > 0) {
                    handleZoomOut();
                } else {
                    handleZoomIn();
                }
            }
        };

        const timelineElement: any = timelineRef.current;
        if (timelineElement) {
            timelineElement.addEventListener('wheel', handleScroll);
        }

        return () => {
            if (timelineElement) {
                timelineElement.removeEventListener('wheel', handleScroll);
            }
        };
    }, []);

    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 0.25, 50));
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 0.25, 0.99));
    };

    const handleTimelineHover = (e: any) => {
        const timelineElement: any = timelineRef.current;
        if (timelineElement) {
            const rect = timelineElement.getBoundingClientRect();
            const position = e.clientX - rect.left;
            const time = (position / rect.width) * timelineLength;
            setHoverTime(Math.min(Math.max(time, startTime), endTime));
        }
    }

    const handleTimelineClick = () => {
        window.addEventListener('mouseup', handleMouseUp);
        setCursorTime(hoverTime);
    };

    const handleMouseUp = () => {
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const getPosition = (time: number) => {
        //return `${Math.min(((time / timelineLength) * 100)), ((endTime / timelineLength) * 100)}%`;
        if (time > endTime)
            return endTime;
        return `${Math.min(time / timelineLength) * 100}%`;
    };

    const generateTimeMarkers = () => {
        const markers = [];
        const interval = timelineLength / 50; // 100 markers
        for (let i = 0; i <= timelineLength; i += interval) {
            markers.push(i);
        }
        return markers;
    };

    const addKeyframe = () => {
        const cam: vec3 = { x: 0, y: 0, z: 0 };
        const newKeyframe: Keyframe = { blend: "linear", time: cursorTime, value: cam, id: Math.random().toString(36) };

        setKeyframe([...keyframe, newKeyframe]);
        console.log(keyframe);
    }

    const deleteKeyframe = () => {
        const updatedKeyframes = keyframe.filter(x => !x.clicked);
        return setKeyframe(updatedKeyframes);
    }

    const handleDragStart = (e: any) => {
        // Create an empty or transparent image
        const img = new Image();
        img.src = ''; // An empty or transparent image
        e.dataTransfer.setDragImage(img, 0, 0); // Set the custom drag image
    };

    const dragKeyframe = (e: any, key: Keyframe) => {
        e.preventDefault();

        const timelineElement: any = timelineRef.current;
        if (timelineElement) {
            const rect = timelineElement.getBoundingClientRect();
            const position = e.clientX - rect.left;
            const time = (position / rect.width) * timelineLength;
            setHoverTime(Math.min(Math.max(time, startTime), endTime));
        }

        const keys: any = keyframe.map(x => {
            if (x.id === key.id) {
                x.time = hoverTime;
            }
            return x;
        })

        return setKeyframe(keys);
    }

    const openSecondWindow = () => {
        window.ipcRenderer.send('open-second-window');
    };

    return (
        <div className="p-1 drag-area bg-gradient-to-t from-gold6 to-gold5">
            <div className="bg-mainbg p-1">
                <div className="flex flex-row space-x-12 p-2 border-2 border-innerborder rounded-none bg-mainbg">
                    <div className="flex flex-row space-x-2 no-drag">
                        <Tooltip content={"Start sequence"}>
                            <button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
                                onClick={(e) => { e.preventDefault() }}>
                                <IconPlayerPlay className="stroke-gold4 w-4"></IconPlayerPlay>
                            </button>
                        </Tooltip>
                        <Tooltip content={"Go back 15 seconds"}>
                            <button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
                                onClick={(e) => { e.preventDefault() }}>
                                <IconArrowBack className="stroke-gold4 w-4"></IconArrowBack>
                            </button>
                        </Tooltip>
                    </div>
                    <div className="flex flex-col grow space-y-2 no-drag">
                        <div className="w-auto overflow-x-scroll h-fit custom-scrollbar no-drag">
                            <div
                                ref={timelineRef}
                                className="relative bg-timeline h-8 overflow-y-clip overflow-x-clip no-drag"
                                style={{ width: `${100 * zoom}%` }}
                                onMouseDown={handleTimelineClick}
                                onMouseMove={handleTimelineHover}
                            >
                                {/* time markers */}
                                {generateTimeMarkers().map((time, index) => (
                                    <div className="flex flex-col absolute transform"
                                        style={{ left: getPosition(time) }}>
                                        <span
                                            key={index}
                                            className="absolute transform translate-y-3/4 op-0 h-8 border-r border-gray-400"
                                        >
                                        </span>
                                        <span className="text-xs text-grey2 text-start select-none">{Math.round(time)}</span>
                                    </div>
                                ))}

                                <div className="absolute top-1/2 transform -translate-y-1/2 bg-gold4 w-0.5 h-8 flex items-center justify-center text-white"
                                    style={{ left: getPosition(cursorTime) }}
                                >
                                </div>

                                <div className="absolute top-1/2 transform -translate-y-1/2 bg-gold6 w-0.5 h-8 flex items-center justify-center text-white"
                                    style={{ left: getPosition(hoverTime) }}
                                >
                                </div>

                                {keyframe.map(x =>
                                    <div
                                        draggable={true}
                                        onDragStart={handleDragStart}
                                        onDrag={(e) => { dragKeyframe(e, x) }} key={x.id}
                                        className="absolute top-1/2 transform -translate-y-1/2 -mx-3 cursor-pointer"
                                        style={{ left: getPosition(x.time) }}
                                    >
                                        <KeyframeIcon style={{ fill: x.clicked ? "#742a2a" : "none" }}
                                            className={` ${!x.clicked ? 'shadow-none' : 'shadow-lg'}`}
                                            onClick={() => { setSelectedKeyframe(x); x.clicked = !x.clicked }}
                                            onDragOver={(e) => { e.preventDefault() }}
                                            onDrag={(e) => { e.preventDefault() }}
                                            key={x.id}
                                        >
                                        </KeyframeIcon>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-x-4 flex flex-row">
                            <Tooltip content={"Add keyframe"}>
                                <button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
                                    onClick={() => addKeyframe()}>
                                    <IconKeyframe className="stroke-gold4 w-4"></IconKeyframe>
                                </button>
                            </Tooltip>
                            <Tooltip content={"Add curves to selected"}>
                                <button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
                                    onClick={() => deleteKeyframe()}>
                                    <IconVectorBezier2 className="stroke-gold4 w-4"></IconVectorBezier2>
                                </button>
                            </Tooltip>
                            <Tooltip content={"Clear selected keyframes"}>
                                <button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
                                    onClick={() => deleteKeyframe()}>
                                    <IconSquareRoundedMinus className="stroke-gold4 w-4"></IconSquareRoundedMinus>
                                </button>
                            </Tooltip>
                            <Tooltip content={"Clear all keyframes"}>
                                <button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
                                    onClick={() => setKeyframe([])}>
                                    <IconTrash className="stroke-gold4 w-4"></IconTrash>
                                </button>
                            </Tooltip>
                            <span></span>
                            <span></span>
                            <Tooltip content={"Environment settings"}>
                                <button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
                                    onClick={openSecondWindow}>
                                    <IconEyeCog className="stroke-gold4 w-4"></IconEyeCog>
                                </button>
                            </Tooltip>
                            <Tooltip content={"Keyframe settings"}>
                                <button className="w-7 border-gold5 bg-gradient-to-b from-blue5 to-grey3 border-2 text-nowrap items-center align-middle justify-center flex"
                                    onClick={() => deleteKeyframe()}>
                                    <IconKeyframes className="stroke-gold4 w-4"></IconKeyframes>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
