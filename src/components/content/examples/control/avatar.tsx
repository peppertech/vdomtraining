import { ComponentProps } from "preact";
import "ojs/ojavatar";

type AvatarProps = ComponentProps<"oj-avatar">;

type Props = {
	src?: AvatarProps["src"];
	iconClass?: AvatarProps["iconClass"];
	initials?: AvatarProps["initials"];
	size?: AvatarProps["size"];
	shape?: AvatarProps["shape"];
	ariaLabel?: string;
	background?: AvatarProps["background"];
};

const Avatar = ({
	src,
	iconClass,
	initials,
	size = "md",
	shape,
	ariaLabel,
	background,
}: Props) => {
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
