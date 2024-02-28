import { h, FunctionComponent, ComponentChildren } from "preact";
import "ojs/ojknockout";
import "ojs/ojmasonrylayout";

// MasonryItem Props Interface
interface MasonryItemProps {
	sizeClass: string; // Example: "oj-masonrylayout-tile-1x1"
	children: ComponentChildren;
}

// MasonryItem Component
const MasonryItem: FunctionComponent<MasonryItemProps> = ({
	sizeClass,
	children,
}) => {
	return <div class={`${sizeClass} oj-panel`}>{children}</div>;
};

// MasonryLayout Props Interface
interface MasonryLayoutProps {
	children: ComponentChildren;
}

// MasonryLayout Component
const MasonryLayout: FunctionComponent<MasonryLayoutProps> = ({ children }) => {
	return (
		<div>
			<oj-masonry-layout id="masonryLayout">{children}</oj-masonry-layout>
		</div>
	);
};

// Export both components
export { MasonryLayout, MasonryItem };
