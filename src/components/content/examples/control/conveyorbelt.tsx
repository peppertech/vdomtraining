import { h } from "preact";
import "ojs/ojconveyorbelt";
import "ojs/ojbutton";

type ConveyorBeltProps = {
	children: preact.ComponentChildren; // Accept any valid Preact children
	orientation?: "horizontal" | "vertical"; // Optional orientation property
};

const ConveyorBelt = ({
	children,
	orientation = "horizontal",
}: ConveyorBeltProps) => {
	return (
		<oj-conveyor-belt
			class={`oj-conveyorbelt-${orientation}`}
			data-oj-binding-provider="none"
		>
			{children}
		</oj-conveyor-belt>
	);
};

export default ConveyorBelt;
