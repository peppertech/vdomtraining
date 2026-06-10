import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import 'ojs/ojtoolbar';

type MenuInfo = {
  id: string;
  label: string;
  icon: string;
  disabled: boolean;
};

export const MenuButtonsMenuButtonDisplay = () => {
  const menuItems = useMemo<MenuInfo[]>(
    () => [
      {
        id: 'zoomin',
        label: 'Zoom In',
        icon: 'oj-ux-ico-zoom-in',
        disabled: false
      },
      {
        id: 'zoomout',
        label: 'Zoom Out',
        icon: 'oj-ux-ico-zoom-out',
        disabled: false
      },
      { id: 'divider', label: '----', icon: '', disabled: false },
      { id: 'save', label: 'Save', icon: 'oj-ux-ico-save', disabled: false },
      {
        id: 'print',
        label: 'Print...',
        icon: 'oj-ux-ico-print',
        disabled: true
      }
    ],
    []
  );

  const renderMenuOption = (item: MenuInfo) => {
    if (item.id === 'divider') {
      return <oj-option id={item.id} />;
    }

    return (
      <oj-option id={item.id} disabled={item.disabled} value={item.label}>
        {item.icon ? <span slot="startIcon" class={item.icon} /> : null}
        {item.label}
      </oj-option>
    );
  };

  return (
    <div id="menubutton-container">
      <h6>Start Slot & display="all"</h6>
      <div>
        <oj-menu-button chroming="outlined" id="menuButton2">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Action
          <oj-menu id="myMenu2" slot="menu" aria-label="menu with selection">
            {menuItems.map(renderMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">Start Slot & display="icons"</h6>
      <div>
        <oj-menu-button chroming="outlined" id="menuButton4" display="icons">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Action
          <oj-menu id="myMenu4" slot="menu" aria-label="menu with selection">
            {menuItems.map(renderMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">End Slot & display="icons"</h6>
      <div>
        <oj-menu-button chroming="outlined" id="menuButton5" display="icons">
          <span slot="endIcon" class="oj-ux-ico-settings" />
          Action
          <oj-menu id="myMenu5" slot="menu" aria-label="menu with selection">
            {menuItems.map(renderMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">display="icons" only</h6>
      <div>
        <oj-menu-button chroming="outlined" id="menuButton3" display="icons">
          Action
          <oj-menu id="myMenu3" slot="menu" aria-label="menu with selection">
            {menuItems.map(renderMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </div>
    </div>
  );
};

export default MenuButtonsMenuButtonDisplay;
