import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cameraPosition, cameraRotation, Keyframe, vec3 } from "../../Models/Keyframe";
import KeyframeIcon from "../../Shared/KeyframeIcon";
import { defaultSequence, defaultState, Timeline } from "../../Models/Timeline";
import { SecondaryControls } from "./SecondaryControls";
import { MainControls } from "./MainControls";

const getPosition = (time: number, timeline: Timeline) => {
	if (time > timeline.length)
		return timeline.length;
	return `${Math.min(time / timeline.length) * 100}%`;
};

const generateTimeMarkers = (timeline: Timeline, zoom: number) => {
	const markers = [];
	const div = zoom > 2 ? 45 : 25;
	const interval = (timeline.length / zoom) / div; // 100 markers
	for (let i = 0; i <= timeline.length; i += interval) {
		markers.push(i);
	}
	return markers;
};

const handleDragStart = (e: any) => {
	// Create an empty or transparent image
	const img = new Image();
	img.src = ''; // An empty or transparent image
	e.dataTransfer.setDragImage(img, 0, 0); // Set the custom drag image
};

export const TimelineForm = () => {
	const [timeline, setTimeline] = useState<Timeline>(defaultState);
	const [zoom, setZoom] = useState(1);
	const [cursorTime, setCursorTime] = useState(100);
	const [hoverTime, setHoverTime] = useState(100);
	const [keyframe, setKeyframe] = useState<Array<Keyframe>>([]);
	const [selectedKeyframe, setSelectedKeyframe] = useState<Keyframe>();
	const [pending, setPending] = useState<Boolean>(false);
	const [sequence, setSequence] = useState<Boolean>(false);

	const timelineRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleScroll = (e: WheelEvent) => {
			if (e.ctrlKey) {
				e.preventDefault();

				const timelineElement = timelineRef.current;
				const scrollableElement = timelineElement?.parentElement;

				if (scrollableElement && timelineElement) {
					const rect = timelineElement.getBoundingClientRect();
					const previousWidth = rect.width;
					const scrollLeft = scrollableElement.scrollLeft;

					const cursorPosition = (cursorTime / timeline.length) * previousWidth;
					const cursorRelativeToScroll = cursorPosition - scrollLeft;

					let newZoom;
					if (e.deltaY > 0) {
						newZoom = Math.max(zoom - 1, 0.99);
					} else {
						newZoom = Math.min(zoom + 1, 100);
					}
					setZoom(newZoom);

					setTimeout(() => {
						const newTimelineWidth = timelineElement.getBoundingClientRect().width;
						const newCursorPosition = (cursorTime / timeline.length) * newTimelineWidth;
						const newScrollLeft = newCursorPosition - cursorRelativeToScroll;

						scrollableElement.scrollLeft = Math.max(0, newScrollLeft);
					}, 0);
				}
			}
		};

		const timelineElement = timelineRef.current;
		const scrollableElement = timelineElement?.parentElement;

		if (scrollableElement) {
			scrollableElement.addEventListener('wheel', handleScroll);
		}

		return () => {
			if (scrollableElement) {
				scrollableElement.removeEventListener('wheel', handleScroll);
			}
		};
	}, [cursorTime, timeline.length, zoom]);


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

		window.ipcRenderer.invoke('post-timeline', { key: "time", value: hoverTime }).finally(() => {
			setPending(false);
		});
	};

	const handleMouseUp = () => {
		window.removeEventListener('mouseup', handleMouseUp);
	};

	const addKeyframe = useCallback(() => {
		window.ipcRenderer.invoke('get-render').then((newData) => {
			const newKeyframe = {
				time: cursorTime,
				id: Math.random().toString(36),
				show: true,
				cameraPosition: newData.cameraPosition,
				cameraRotation: newData.cameraRotation
			};
			setKeyframe([...keyframe, newKeyframe]);
		});
	}, [cursorTime, keyframe]);

	const deleteKeyframe = useCallback(() => {
		const updatedKeyframes = keyframe.filter(x => !x.clicked);
		return setKeyframe(updatedKeyframes);
	}, [keyframe]);

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

	const sendPlayback = useCallback((data: any) => {
		setPending(true);

		setTimeline({ ...timeline, [data.key]: data.value });

		window.ipcRenderer.invoke('post-timeline', { key: data.key, value: data.value }).finally(() => {
			setPending(false);
		});
	}, [timeline]);

	const sendSequence = (keys: Keyframe[]) => {
		const cameraPosition: cameraPosition[] = [];
		const cameraRotation: cameraRotation[] = [];

		keys.forEach((x) => {
			cameraPosition.push({ blend: "linear", time: x.time, value: x.cameraPosition });
			cameraRotation.push({ blend: "linear", time: x.time, value: x.cameraRotation });
		})

		const sequence: any = defaultSequence;
		sequence.cameraPosition = cameraPosition;
		sequence.cameraRotation = cameraRotation;

		window.ipcRenderer.send('post-sequence', sequence);
		setSequence(true);
	};

	const markers = useMemo(() => {
		return generateTimeMarkers(timeline, zoom);
	}, [timeline, zoom]);

	return (
		<div className="p-1 drag-area bg-gradient-to-br to-50% from-gold3 to-gold5">
			<div className="bg-mainbg p-1">
				<div className="flex flex-row space-x-4 p-2 border-2 border-innerborder rounded-none bg-mainbg">
					<div className="flex flex-col gap-2 no-drag justify-between">
						<MainControls
							sendPlayback={sendPlayback}
							timeline={timeline}
							sendSequence={sendSequence}
							keyframe={keyframe}
							sequence={sequence}
							setSequence={setSequence}
						/>
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
								{markers.map((time, index) => (
									<div className="flex flex-col absolute transform"
										style={{ left: getPosition(time, timeline) }}>
										<span
											key={index}
											className="absolute transform translate-y-3/4 op-0 h-8 border-r border-gray-400"
										>
										</span>
										<span className="text-xs text-grey2 text-start select-none">{Math.round(time)}</span>
									</div>
								))}

								<div className="absolute top-1/2 transform -translate-y-1/2 bg-gold4 w-0.5 h-8 flex items-center justify-center text-white"
									style={{ left: getPosition(cursorTime, timeline) }}
								>
								</div>

								<div className="absolute top-1/2 transform -translate-y-1/2 bg-gold6 w-0.5 h-8 flex items-center justify-center text-white"
									style={{ left: getPosition(hoverTime, timeline) }}
								>
								</div>

								{keyframe.map(x =>
									<div
										draggable={true}
										onDragStart={handleDragStart}
										onDrag={(e) => { dragKeyframe(e, x) }} key={x.id}
										className="absolute top-1/2 transform -translate-y-1/2 -mx-3 cursor-pointer"
										style={{ left: getPosition(x.time, timeline) }}
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
						<SecondaryControls addKeyframe={addKeyframe} deleteKeyframe={deleteKeyframe} setKeyframe={setKeyframe} />
					</div>
				</div>
			</div>
		</div>
	);
};
