import { h } from "preact";
import "ojs/ojavatar";

type AvatarProps = {
	src?: string;
	iconClass?: string;
	initials?: string;
	size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	shape?: "square" | "circle";
	ariaLabel?: string;
	background?:
		| "neutral"
		| "orange"
		| "green"
		| "teal"
		| "blue"
		| "slate"
		| "pink"
		| "purple"
		| "lilac"
		| "gray";
};

const Avatar = ({
	src,
	iconClass,
	initials,
	size = "md",
	shape,
	ariaLabel,
	background,
}: AvatarProps) => {
	return (
		<oj-avatar
			role={ariaLabel ? "img" : undefined}
			src={src}
			icon-class={iconClass}
			initials={initials}
			size={size}
			shape={shape}
			aria-label={ariaLabel}
			title={ariaLabel}
			background={background}
		></oj-avatar>
	);
};

export default Avatar;
