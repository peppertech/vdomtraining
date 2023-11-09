import { h } from "preact";

type BadgeProps = {
	text: string;
	color?: "danger" | "warning" | "success" | "info";
	subtle?: boolean;
	small?: boolean;
	end?: boolean;
};

const Badge = ({ text, color, subtle, small, end }: BadgeProps) => {
	let classNames = "oj-badge";

	if (color) {
		classNames += ` oj-badge-${color}`;
	}
	if (subtle) {
		classNames += " oj-badge-subtle";
	}
	if (small) {
		classNames += " oj-badge-sm";
	}
	if (end) {
		classNames += " oj-badge-end";
	}

	return <span className={classNames}>{text}</span>;
};

export default Badge;
