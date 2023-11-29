import { h } from "preact";
import "ojs/ojtoolbar";
import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojoption";

const Toolbar = () => {
	const handleMenuItemAction = (event: { detail: { value: any } }) => {
		console.log("Selected Item:", event.detail.value);
	};

	return (
		<oj-toolbar
			id="myToolbar1"
			aria-label="Editing Toolbar"
			aria-controls="controlled"
			chroming="outlined"
		>
			<oj-button id="chat1" display="icons">
				<span slot="startIcon" class="oj-ux-ico-chat"></span>
				Chat
			</oj-button>
			<oj-button id="paint1" display="icons">
				<span slot="startIcon" class="oj-ux-ico-color-palette"></span>
				Paint
			</oj-button>
			<oj-button id="bookmark1" display="icons" disabled={true}>
				<span slot="startIcon" class="oj-ux-ico-bookmark-selected"></span>
				Bookmark
			</oj-button>

			<span
				role="separator"
				aria-orientation="vertical"
				class="oj-toolbar-separator"
			></span>

			<oj-menu-button id="menuButton1">
				Menu Button
				<oj-menu id="myMenu1" slot="menu" on-oj-action={handleMenuItemAction}>
					<oj-option id="save1" value="Save">
						<span class="oj-ux-ico-save" slot="startIcon"></span>
						Save
					</oj-option>
					<oj-option id="zoomin1" value="Zoom In">
						<span class="oj-ux-ico-zoom-in" slot="startIcon"></span>
						Zoom In
					</oj-option>
					<oj-option id="zoomout1" value="Zoom Out">
						<span class="oj-ux-ico-zoom-out" slot="startIcon"></span>
						Zoom Out
					</oj-option>
					<oj-option id="print1" value="Print..." disabled={true}>
						<span class="oj-ux-ico-print" slot="startIcon"></span>
						Print...
					</oj-option>
				</oj-menu>
			</oj-menu-button>
			<span
				role="separator"
				aria-orientation="vertical"
				class="oj-toolbar-separator"
			></span>
			<oj-button id="paint1" display="icons">
				<span slot="startIcon" class="oj-ux-ico-color-palette"></span>
				Paint
			</oj-button>
		</oj-toolbar>
	);
};

export default Toolbar;
