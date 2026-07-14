import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import 'preact';
import { useMemo } from 'preact/hooks';

type ItemInfo = {
  id: string;
  label?: string;
  icon: string;
  disabled?: boolean;
};

export const MenuButtonsOverview = () => {
  const menuItems = useMemo<ItemInfo[]>(
    () => [
      { id: 'save', label: 'Save', icon: 'oj-ux-ico-print', disabled: false },
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
      {
        id: 'print',
        label: 'Print...',
        icon: 'oj-ux-ico-print',
        disabled: true
      }
    ],
    []
  );

  const renderTextMenuOption = (item: ItemInfo) => {
    return (
      <oj-option value={item.label} disabled={item.disabled} id={item.id}>
        <span>{item.label}</span>
      </oj-option>
    );
  };

  const renderIconMenuOption = (item: ItemInfo) => {
    return (
      <oj-option value={item.label} disabled={item.disabled} id={item.id}>
        {item.icon ? <span slot="startIcon" class={item.icon} /> : null}
        {item.label}
      </oj-option>
    );
  };

  return (
    <div id="menuButtons-container" class="oj-sm-margin-2x-bottom">
      <h6>Text MenuButton</h6>
      <div>
        <oj-menu-button id="menuButton1">
          Action
          <oj-menu id="myMenu1" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderTextMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">MenuButton with Icon</h6>
      <div>
        <oj-menu-button id="menuButton2">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Action
          <oj-menu id="myMenu2" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton3" display="icons">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Action
          <oj-menu id="myMenu3" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton4" display="icons">
          <span slot="endIcon" class="oj-ux-ico-settings" />
          Action
          <oj-menu id="myMenu4" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton5" display="icons">
          Action
          <oj-menu id="myMenu5" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">Disabled MenuButton</h6>
      <div>
        <oj-menu-button id="menuButton6" disabled>
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Disabled
          <oj-menu id="myMenu6" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">Chroming</h6>
      <div>
        <oj-menu-button chroming="outlined" id="menuButton7">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Outlined
          <oj-menu id="myMenu7" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button chroming="borderless" id="menuButton8">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Borderless
          <oj-menu id="myMenu8" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button chroming="solid" id="menuButton9">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Solid
          <oj-menu id="myMenu9" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </div>
      <h6 class="oj-sm-margin-8x-top">Sizes</h6>
      <div>
        <oj-menu-button id="menuButton10" class="oj-button-sm">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Small
          <oj-menu id="myMenu10" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton11">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Default
          <oj-menu id="myMenu11" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton12" class="oj-button-lg">
          <span slot="startIcon" class="oj-ux-ico-settings" />
          Large
          <oj-menu id="myMenu12" slot="menu" aria-label="menu with actions">
            {menuItems.map(renderIconMenuOption)}
          </oj-menu>
        </oj-menu-button>
      </div>
    </div>
  );
};

export default MenuButtonsOverview;
