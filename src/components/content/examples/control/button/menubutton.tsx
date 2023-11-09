import { h } from "preact";
import "ojs/ojmenu";
import "ojs/ojbutton";

const MenuButton = () => {
	const menuItems = [
		{ id: "save", label: "Save", icon: "oj-ux-ico-print", disabled: false },
		{
			id: "zoomin",
			label: "Zoom In",
			icon: "oj-ux-ico-zoom-in",
			disabled: false,
		},
		{
			id: "zoomout",
			label: "Zoom Out",
			icon: "oj-ux-ico-zoom-out",
			disabled: false,
		},
		{ id: "print", label: "Print...", icon: "oj-ux-ico-print", disabled: true },
	];

	return (
		<oj-menu-button id="menuButton1">
			Action
			<oj-menu id="myMenu1" slot="menu">
				{menuItems.map((item) => (
					<oj-option
						value={item.label}
						disabled={item.disabled}
						id={item.id}
						key={item.id}
					>
						{item.label}
					</oj-option>
				))}
			</oj-menu>
		</oj-menu-button>
	);
};

export default MenuButton;
