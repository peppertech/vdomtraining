import "preact";
import "ojs/ojmenu";
import "ojs/ojbutton";
import "ojs/ojoption";
import { MenuElement } from "ojs/ojmenu";

const Menu = () => {
  const menuItemAction = (event: MenuElement.ojMenuAction) => {
    const value = event.detail.selectedValue;
    console.log(`Selected menu item: ${value}`);
    // Handle menu action based on the 'value' property of the selected menu item
  };

  return (
    <oj-menu-button id="menuButton2" class="oj-sm-margin-5x-bottom">
      Actions
      <oj-menu id="myMenu2" slot="menu" onojMenuAction={menuItemAction}>
        <oj-option id="zoomin" value="Zoom In">
          <span class="oj-ux-ico-zoom-in" slot="startIcon"></span>
          Zoom In
        </oj-option>
        <oj-option id="zoomout" value="Zoom Out">
          <span class="oj-ux-ico-zoom-out" slot="startIcon"></span>
          Zoom Out
        </oj-option>
        <oj-option id="divider"></oj-option>
        <oj-option id="save" value="Save">
          <span class="oj-ux-ico-save" slot="startIcon"></span>
          Save
        </oj-option>
        <oj-option id="print" value="Print..." disabled={true}>
          <span class="oj-ux-ico-print" slot="startIcon"></span>
          Print...
        </oj-option>
      </oj-menu>
    </oj-menu-button>
  );
};

export default Menu;
