import { h } from "preact";
import { ojButton } from "ojs/ojbutton";
import "ojs/ojbutton"; // Import Oracle JET Button component

type ButtonProps = {
	text: string;
	iconStartClass?: string;
	iconEndClass?: string;
	disabled?: boolean;
	chroming?: "borderless" | "outlined" | "solid" | "callToAction" | "danger";
	size?: "sm" | "md" | "lg"; // Assuming 'md' is the default size
	fullWidth?: boolean; // This could be used for 'oj-button-full-width'
	onClick?: (event: MouseEvent) => void;
};

const Button = ({
	text,
	iconStartClass,
	iconEndClass,
	disabled = false,
	chroming = "solid",
	size = "md",
	fullWidth = false,
	onClick,
}: ButtonProps) => {
	const buttonClasses = `oj-button ${size === "sm" ? "oj-button-sm" : ""} ${
		size === "lg" ? "oj-button-lg" : ""
	} ${fullWidth ? "oj-button-full-width" : ""}`;

	return (
		<oj-button
			onClick={onClick}
			disabled={disabled}
			class={buttonClasses}
			chroming={chroming}
			display={iconStartClass || iconEndClass ? "icons" : "all"}
		>
			{iconStartClass && <span slot="startIcon" class={iconStartClass}></span>}
			{text}
			{iconEndClass && <span slot="endIcon" class={iconEndClass}></span>}
		</oj-button>
	);
};

export default Button;
