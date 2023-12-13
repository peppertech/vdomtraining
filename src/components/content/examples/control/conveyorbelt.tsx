import { h } from "preact";
import "ojs/ojconveyorbelt";

type ConveyorBeltProps = {
	children: preact.ComponentChildren;
	orientation?: "horizontal" | "vertical";
	arrowVisibility?: "auto" | "visible" | "hidden";
	contentParent?: string;
	scrollPosition?: number;
};

const ConveyorBelt = ({
	children,
	orientation = "horizontal",
	arrowVisibility,
	contentParent,
	scrollPosition,
}: ConveyorBeltProps) => {
	return (
		<oj-conveyor-belt
			orientation={orientation}
			arrow-visibility={arrowVisibility}
			content-parent={contentParent}
			scroll-position={scrollPosition}
		>
			{children}
		</oj-conveyor-belt>
	);
};

export default ConveyorBelt;
