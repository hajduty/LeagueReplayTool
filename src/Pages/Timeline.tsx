import { useEffect, useRef, useState } from "react";
import { cameraPosition, cameraRotation, Keyframe, vec3 } from "../Models/Keyframe";
import { KeyframeForm } from "../Shared/Keyframe";
import KeyframeIcon from "../Shared/KeyframeIcon";
import { IconArrowBack, IconArrowBackUp, IconArrowBackUpDouble, IconArrowDownFromArc, IconArrowUpFromArc, IconEyeCog, IconKey, IconKeyframe, IconKeyframeAlignCenter, IconKeyframes, IconMinimize, IconMinus, IconPlayerEject, IconPlayerPause, IconPlayerPlay, IconPlus, IconRewindBackward15, IconScanEye, IconSquareRoundedMinus, IconTrash, IconVectorBezier2, IconWindowMinimize } from "@tabler/icons-react";
import Tooltip from "../Shared/Tooltip";
import { Button } from "../Shared/Button";
import { Timeline } from "../Models/Timeline";
import { Slider } from "@mui/material";
import { Render } from "../Models/Render";

const defaultState = {
    length: 1000,
    paused: false,
    seeking: false,
    speed: 1.0,
    time: 100,
}

export const TimelineForm = () => {
    const [timeline, setTimeline] = useState<Timeline>(defaultState);
    const [render, setRender] = useState<Render>();
    const [zoom, setZoom] = useState(1);
    const [cursorTime, setCursorTime] = useState(100);
    const [hoverTime, setHoverTime] = useState(100);
    const [keyframe, setKeyframe] = useState<Array<Keyframe>>([]);
    const [selectedKeyframe, setSelectedKeyframe] = useState<Keyframe>();
    const [pending, setPending] = useState<Boolean>(false);
    const [sequence, setSequence] = useState<Boolean>(false);
    const timelineRef = useRef(null);
    //const startTime = 0;
    //const endTime = 2500; // Updated end time
    // const timelineLength = endTime - startTime;

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

    useEffect(() => {
        const fetchData = () => {
            if (pending)
                return;
            window.ipcRenderer.invoke('get-timeline').then((newData) => {
                setTimeline(
                    newData
                );
                setCursorTime(newData.time);
            });
        };

        const intervalId = setInterval(fetchData, 500);

        return () => clearInterval(intervalId);
    }, [pending]);

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
            const time = (position / rect.width) * timeline.length;
            setHoverTime(Math.min(Math.max(time, 0), timeline.length));
        }
    }

    const handleTimelineClick = () => {
        setPending(true);
        window.addEventListener('mouseup', handleMouseUp);
        setCursorTime(hoverTime);
        const data = { time: hoverTime, seeking: true };

        window.ipcRenderer.invoke('post-timeline', { key: "time", value: hoverTime }).finally(() => {
            setPending(false);
        });
        //{ key, value: !visibility[key] }
    };

    const handleMouseUp = () => {
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const getPosition = (time: number) => {
        //return `${Math.min(((time / timelineLength) * 100)), ((endTime / timelineLength) * 100)}%`;
        if (time > timeline.length)
            return timeline.length;
        return `${Math.min(time / timeline.length) * 100}%`;
    };

    const generateTimeMarkers = () => {
        const markers = [];
        const interval = timeline.length / 50; // 100 markers
        for (let i = 0; i <= timeline.length; i += interval) {
            markers.push(i);
        }
        return markers;
    };

    const addKeyframe = () => {
        const cam: vec3 = { x: 0, y: 0, z: 0 };

        window.ipcRenderer.invoke('get-render').then((newData) => {
            setRender(newData);
            const cameraPosition: vec3 = newData.cameraPosition;
            const cameraRotation: vec3 = newData.cameraRotation;
            const newKeyframe: Keyframe = { time: cursorTime, id: Math.random().toString(36), show: true, cameraPosition, cameraRotation };
            setKeyframe([...keyframe, newKeyframe]);
            console.log(newKeyframe);
        });
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
            const time = (position / rect.width) * timeline.length;
            setHoverTime(Math.min(Math.max(time, 0), timeline.length));
        }

        const keys: any = keyframe.map(x => {
            if (x.id === key.id) {
                x.time = hoverTime;
            }
            return x;
        })

        if (sequence) {
            sendSequence(keys);
        }

        return setKeyframe(keys);
    }

    const sendPlayback = (data: any) => {
        setPending(true);

        setTimeline({ ...timeline, [data.key]: data.value });

        window.ipcRenderer.invoke('post-timeline', { key: data.key, value: data.value }).finally(() => {
            setPending(false);
        });
    }

    const sendSequence = (keys: Keyframe[]) => {
        const cameraPosition: cameraPosition[] = [];
        const cameraRotation: cameraRotation[] = [];

        keys.forEach((x) => {
            cameraPosition.push({ blend: "linear", time: x.time, value: x.cameraPosition });
            cameraRotation.push({ blend: "linear", time: x.time, value: x.cameraRotation });
        })

        const obj = {
            cameraPosition,
            cameraRotation,
            depthFogColor: null,
            depthFogEnabled: null,
            depthFogEnd: null,
            depthFogIntensity: null,
            depthFogStart: null,
            depthOfFieldCircle: null,
            depthOfFieldEnabled: null,
            depthOfFieldFar: null,
            depthOfFieldMid: null,
            depthOfFieldNear: null,
            depthOfFieldWidth: null,
            farClip: null,
            fieldOfView: null,
            heightFogColor: null,
            heightFogEnabled: null,
            heightFogEnd: null,
            heightFogIntensity: null,
            heightFogStart: null,
            navGridOffset: null,
            nearClip: null,
            playbackSpeed: null,
            selectionName: null,
            selectionOffset: null,
            skyboxOffset: null,
            skyboxRadius: null,
            skyboxRotation: null,
            sunDirection: null
        };

        window.ipcRenderer.send('post-sequence', obj);
        setSequence(true);
    }

    const openEnvironment = () => {
        window.ipcRenderer.send('open-environment');
    };

    const openVisibility = () => {
        window.ipcRenderer.send('open-visibility');
    };

    const minimizeWindow = () => {
        window.ipcRenderer.send('minimize');
    };

    return (
        <div className="p-1 drag-area bg-gradient-to-br to-50% from-gold3 to-gold5">
            <div className="bg-mainbg p-1">
                <div className="flex flex-row space-x-4 p-2 border-2 border-innerborder rounded-none bg-mainbg">
                    <div className="flex flex-col gap-2 no-drag justify-between">
                        <div className="flex flex-row space-x-2 no-drag">
                            <Button onClick={() => { sendPlayback({ key: "paused", value: !timeline.paused }) }} content={
                                timeline.paused ? (
                                    <IconPlayerPlay className="stroke-gold4 w-4" />
                                ) : (
                                    <IconPlayerPause className="stroke-gold4 w-4" />
                                )
                            }
                                tooltip={"Resume playback"} />
                            <Button onClick={() => { sendPlayback({ key: "time", value: timeline.time - 15 }) }}
                                content={<IconRewindBackward15 className="stroke-gold4 w-4"></IconRewindBackward15>}
                                tooltip={"Go back 15 seconds"} />

                            {sequence ?
                                (<Button onClick={() => { window.ipcRenderer.send('post-sequence', {}); setSequence(false); }}
                                    content={<IconArrowUpFromArc className="stroke-gold4 w-4" />}
                                    tooltip={"Unapply sequence"} />)
                                :
                                (<Button onClick={() => { sendSequence(keyframe); }}
                                    content={<IconArrowDownFromArc className="stroke-gold4 w-4" />}
                                    tooltip={"Apply sequence"} />)}
                        </div>
                        <div className="flex flex-row space-x-2 no-drag items-center">
                            <Button onClick={() => { sendPlayback({ key: "speed", value: Math.max(timeline.speed - 0.25, 0.25).toFixed(2) }) }} content={<IconMinus className="stroke-gold4 w-4"></IconMinus>} tooltip={"Go back 15 seconds"} />
                            <Button onClick={() => { sendPlayback({ key: "speed", value: (timeline.speed + 0.25).toFixed(2) }) }} content={<IconPlus className="stroke-gold4 w-4"></IconPlus>} tooltip={"Go back 15 seconds"} />
                            <p className="text-grey2 font-semibold text-xs select-none w-8">{timeline.speed}X</p>
                        </div>
                    </div>
                    <div className="flex flex-col grow gap-2 justify-between no-drag">
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
                                <Button onClick={minimizeWindow} content={<IconKeyframeAlignCenter className="stroke-gold4 w-4"></IconKeyframeAlignCenter>} tooltip={"Keyframe settings"} />
                            </span>
                            <Button onClick={minimizeWindow} content={<IconWindowMinimize className="stroke-gold4 w-4"></IconWindowMinimize>} tooltip={"Minimize window"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
