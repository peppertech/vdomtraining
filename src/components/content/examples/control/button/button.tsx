import { h } from "preact";
import "ojs/ojbutton"; // Import Oracle JET Button component

type ButtonProps = {
	label?: string; // Text label for the button, overrides default slot if provided
	iconStartClass?: string;
	iconEndClass?: string;
	disabled?: boolean;
	chroming?: "borderless" | "outlined" | "solid" | "callToAction" | "danger";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
	onOjAction?: (event: CustomEvent) => void; // Handling ojAction event
	ariaLabel?: string; // For accessibility
};

const Button = ({
	label,
	iconStartClass,
	iconEndClass,
	disabled = false,
	chroming = "solid",
	size = "md",
	fullWidth = false,
	onOjAction,
	ariaLabel,
}: ButtonProps) => {
	const buttonClasses = `oj-button ${size === "sm" ? "oj-button-sm" : ""} ${
		size === "lg" ? "oj-button-lg" : ""
	} ${fullWidth ? "oj-button-full-width" : ""}`;

	const handleOjAction = (event: CustomEvent) => {
		if (onOjAction) {
			onOjAction(event);
		}
	};

	return (
		<oj-button
			onojAction={handleOjAction}
			disabled={disabled}
			class={buttonClasses}
			chroming={chroming}
			display={iconStartClass || iconEndClass ? "icons" : "all"}
			aria-label={
				ariaLabel ||
				label ||
				(iconStartClass || iconEndClass ? "Button" : undefined)
			}
			label={label}
		>
			{iconStartClass && <span slot="startIcon" class={iconStartClass}></span>}
			{!label && <span>{label}</span>} {/* Render label if provided */}
			{iconEndClass && <span slot="endIcon" class={iconEndClass}></span>}
		</oj-button>
	);
};

export default Button;
