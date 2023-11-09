import { h } from "preact";
import Avatar from "./avatar";
import Badge from "./badge";
import Button from "./button/button";
import ConveyorBelt from "./conveyorbelt";
import FilePicker from "./filepicker";
import FilmStrip from "./filmstrip";
import Menu from "./menu/menu";
import ProgressBar from "./progress/progressbar";
import Toolbar from "./toolbar";
import Train from "./train";
import ButtonSetMany from "./button/buttonsetmany";
import ButtonSetOne from "./button/buttonsetone";
import MenuButton from "./button/menubutton";
import CSSImage from "./image/cssimage";
import IconFont from "./image/iconfont";
import MenuSelectMany from "./menu/menuselectmany";
import ProgressCircle from "./progress/progresscircle";

const Control = () => {
	const handleFileSelect = (fileNames: any) => {
		console.log("Selected files:", fileNames);
	};

	const handleInvalidFileSelect = (message: any) => {
		console.error("Invalid file selection:", message);
	};
	return (
		<div class="oj-web-applayout-max-width oj-web-applayout-content">
			<div class="oj-flex oj-sm-flex-items-1">
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Avatar</h2>
					<Avatar
						src="https://avatars.githubusercontent.com/u/1252674?v=4"
						initials="AB"
						size="lg"
						shape="circle"
						ariaLabel="Amy Bartlett"
					/>
					<Avatar
						src="https://avatars.githubusercontent.com/u/1252674?v=4"
						initials="AB"
						size="md"
						shape="square"
						ariaLabel="Amy Bartlett"
					/>
					<Avatar
						src="https://avatars.githubusercontent.com/u/1252674?v=4"
						initials="AB"
						size="sm"
						shape="circle"
						ariaLabel="Amy Bartlett"
					/>
					<Avatar
						src="https://avatars.githubusercontent.com/u/1252674?v=4"
						initials="AB"
						size="xs"
						shape="square"
						ariaLabel="Amy Bartlett"
					/>
					<Avatar
						src="https://avatars.githubusercontent.com/u/1252674?v=4"
						initials="AB"
						size="2xs"
						shape="circle"
						ariaLabel="Amy Bartlett"
					/>
				</div>
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Badge</h2>
					<Badge text="Neutral" />
					<Badge text="Danger" color="danger" />
					<Badge text="Warning" color="warning" subtle />
					<Badge text="Success" color="success" small />
					<Badge text="Best Seller" end />
				</div>
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Button</h2>
					<div>
						<Button
							text="Button Text 1"
							onClick={() => console.log("Button clicked")}
						/>
						<Button text="Icon Button" iconStartClass="oj-ux-ico-information" />
						<Button text="Disabled Button" disabled={true} />
						<Button
							text="Call To Action"
							chroming="callToAction"
							fullWidth={true}
						/>
					</div>
					<br />
					<div>
						<ButtonSetMany />
					</div>
					<br />
					<div>
						<ButtonSetOne />
					</div>
					<br />
					<div>
						<MenuButton />
					</div>
				</div>
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Conveyor Belt</h2>
					<ConveyorBelt>
						<Button
							text="Button Text 1"
							onClick={() => console.log("Button clicked")}
						/>
						<Button
							text="Button Text 1"
							onClick={() => console.log("Button clicked")}
						/>
						<Button
							text="Button Text 1"
							onClick={() => console.log("Button clicked")}
						/>
						<Button
							text="Button Text 1"
							onClick={() => console.log("Button clicked")}
						/>
						<Button
							text="Button Text 1"
							onClick={() => console.log("Button clicked")}
						/>
					</ConveyorBelt>
				</div>

				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">File Picker</h2>
					<FilePicker
						onFileSelect={handleFileSelect}
						onInvalidFileSelect={handleInvalidFileSelect}
					/>
				</div>
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Film Strip</h2>
					<FilmStrip />
				</div>
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Images</h2>
					{/* <div>
						<CSSImage />
					</div> */}
					<div>
						<IconFont />
					</div>
				</div>
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Menu</h2>
					<div>
						<Menu />
					</div>
					<br />
					<div>
						<MenuButton />
					</div>
					<br />
					<div>
						<MenuSelectMany />
					</div>
				</div>
				{/* <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Messages</h2>
					<ProgressBar />
				</div> */}
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Progress Bar</h2>
					<div>
						<ProgressBar />
					</div>
					<br />
					<div>
						<ProgressCircle />
					</div>
				</div>
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Toolbar</h2>
					<Toolbar />
				</div>
				<div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
					<h2 class="oj-typography-heading-sm">Train</h2>
					<Train />
				</div>
			</div>
		</div>
	);
};
export default Control;
