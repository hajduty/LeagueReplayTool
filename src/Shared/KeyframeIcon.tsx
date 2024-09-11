import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}   // Width of the SVG
		height={25}  // Height of the SVG
		fill="none"
		viewBox="0 0 24 25"  // Adjusted viewBox to fit the entire SVG
		className="group"
		{...props}
	>
		<rect
			x="0"
			y="0"
			width="24"
			height="25"
			fill="none"
		/>
		<g data-testid="Path">
			<path
				d="M12 18L6 12 12 6 18 12 12 18Z"
				className="stroke-gold4 transition-all duration-75 hover:stroke-gold7 hover:fill-transparent active:fill-red-900"
				strokeWidth={2.5} // Thicker stroke
				transform="translate(0.5, 0.5)" // Optional adjustment to fine-tune centering
			/>
		</g>
	</svg>
);

export default SvgComponent;
