import { h } from "preact";
import { useState, useCallback } from "preact/hooks";

const MenuSelectMany = () => {
	const [selectedOptions, setSelectedOptions] = useState(["large font"]);

	const menuItemAction = useCallback(
		(event: {
			detail: { value: string[] | ((prevState: string[]) => string[]) };
		}) => {
			// Update the state with the new selection
			setSelectedOptions(event.detail.value);
		},
		[]
	);

	return (
		<oj-menu-button id="menuButton" class="oj-sm-margin-5x-bottom">
			Page Settings
			<oj-menu id="myMenu" slot="menu" on-oj-menu-action={menuItemAction}>
				<oj-menu-select-many value={selectedOptions}>
					<oj-option value="sliding navigation">Sliding Navigation</oj-option>
					<oj-option value="right-to-left reading direction">
						Right-to-Left Reading Direction
					</oj-option>
					<oj-option value="large font">Large Font</oj-option>
					<oj-option value="debug mode">Debug Mode</oj-option>
					<oj-option value="high contrast mode">High Contrast Mode</oj-option>
				</oj-menu-select-many>
			</oj-menu>
		</oj-menu-button>
	);
};

export default MenuSelectMany;
