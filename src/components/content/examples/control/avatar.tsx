import { h } from "preact";
import "ojs/ojavatar"; // Import Oracle JET Avatar component

type AvatarProps = {
	src?: string;
	iconClass?: string;
	initials?: string;
	size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	shape?: "square" | "circle";
	ariaLabel: string;
};

const Avatar = ({
	src,
	iconClass,
	initials,
	size = "md", // Default size is 'md'
	shape,
	ariaLabel,
}: AvatarProps) => {
	return (
		<oj-avatar
			role="img"
			src={src}
			icon-class={iconClass}
			initials={initials}
			size={size}
			shape={shape}
			aria-label={ariaLabel}
			title={ariaLabel}
		></oj-avatar>
	);
};

export default Avatar;
