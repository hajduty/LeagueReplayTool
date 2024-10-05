import React, { useState, useCallback, useEffect, useRef } from 'react';

const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
	const [visible, setVisible] = useState(false);
	const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
	const timeoutRef = useRef<number | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);

	const handleMouseMove = useCallback((event: MouseEvent) => {
		if (tooltipRef.current) {
			const { clientX: x, clientY: y } = event;

			setTooltipStyle({
				position: 'fixed',
				top: `${y}px`, // Adjust tooltip's vertical position
				left: `${x}px`, // Adjust tooltip's horizontal position
				pointerEvents: 'none', // Ensure tooltip doesn't block mouse events
				zIndex: 4000, // Ensure tooltip is above other elements
				transform: 'translate(20%, 0)', // Center the tooltip relative to the cursor
			});
		}
	}, []);

	const handleMouseEnter = () => {
		timeoutRef.current = window.setTimeout(() => {
			setVisible(true);
		}, 500);
		window.addEventListener('mousemove', handleMouseMove);
	};

	const handleMouseLeave = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setVisible(false);
		window.removeEventListener('mousemove', handleMouseMove);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, [handleMouseMove]);

	return (
		<div
			className="relative inline-block"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{visible && (
				<div
					ref={tooltipRef}
					className="fixed bg-mainbg border-gold4 border-1 text-grey1 text-xs rounded-sm shadow-lg whitespace-nowrap px-2 py-1 select-none z-50"
					style={tooltipStyle}
				>
					{content}
				</div>
			)}
			{children}
		</div>
	);
};

export default Tooltip;
