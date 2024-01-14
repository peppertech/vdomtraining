import "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojmenuselectmany";
import { MenuSelectManyElement } from "ojs/ojmenuselectmany";

const MenuSelectMany = () => {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([
    "large font",
  ]);

  const selectManyMenuChanged = (event: MenuSelectManyElement.valueChanged) => {
    // Update the state with the new selection
    setSelectedOptions(event.detail.value);
    console.log("Select Many Menu values: ", event.detail.value);
  };

  return (
    <oj-menu-button id="menuButton" class="oj-sm-margin-5x-bottom">
      Page Settings
      <oj-menu id="myMenu" slot="menu">
        <oj-menu-select-many
          value={selectedOptions}
          onvalueChanged={selectManyMenuChanged}>
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
