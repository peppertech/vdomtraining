import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojoption";
import 'preact';

type MenuItem = {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

const menuItems: MenuItem[] = [
  { id: "save", label: "Save", icon: "oj-ux-ico-print" },
  { id: "zoomin", label: "Zoom In", icon: "oj-ux-ico-zoom-in" },
  { id: "zoomout", label: "Zoom Out", icon: "oj-ux-ico-zoom-out" },
  { id: "print", label: "Print…", icon: "oj-ux-ico-print", disabled: true },
];

const renderMenu = (menuId: string) => (
  <oj-menu id={menuId} slot="menu" aria-label="menu with actions">
    {menuItems.map((item) => (
      <oj-option
        key={`${menuId}-${item.id}`}
        value={item.label}
        disabled={item.disabled}
        id={`${menuId}-${item.id}`}
      >
        {item.icon ? <span slot="startIcon" class={item.icon}></span> : null}
        {item.label}
      </oj-option>
    ))}
  </oj-menu>
);

const MenuButton = () => {
  return (
    <div id="menuButtons-container" class="oj-sm-margin-2x-bottom oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Text MenuButton</h6>
      <div>
        <oj-menu-button id="menuButton1">
          Action
          {renderMenu("myMenu1")}
        </oj-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">MenuButton with Icon</h6>
      <div class="oj-sm-flex oj-sm-flex-wrap oj-sm-column-gap-3x oj-sm-row-gap-3x">
        <oj-menu-button id="menuButton2">
          <span slot="startIcon" class="oj-ux-ico-settings"></span>
          Action
          {renderMenu("myMenu2")}
        </oj-menu-button>

        <oj-menu-button id="menuButton3" display="icons">
          <span slot="startIcon" class="oj-ux-ico-settings"></span>
          Action
          {renderMenu("myMenu3")}
        </oj-menu-button>

        <oj-menu-button id="menuButton4" display="icons">
          <span slot="endIcon" class="oj-ux-ico-settings"></span>
          Action
          {renderMenu("myMenu4")}
        </oj-menu-button>

        <oj-menu-button id="menuButton5" display="icons">
          Action
          {renderMenu("myMenu5")}
        </oj-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Disabled MenuButton</h6>
      <div>
        <oj-menu-button id="menuButton6" disabled={true}>
          <span slot="startIcon" class="oj-ux-ico-settings"></span>
          Disabled
          {renderMenu("myMenu6")}
        </oj-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Chroming</h6>
      <div class="oj-sm-flex oj-sm-flex-wrap oj-sm-column-gap-3x oj-sm-row-gap-3x">
        <oj-menu-button chroming="outlined" id="menuButton7">
          <span slot="startIcon" class="oj-ux-ico-settings"></span>
          Outlined
          {renderMenu("myMenu7")}
        </oj-menu-button>

        <oj-menu-button chroming="borderless" id="menuButton8">
          <span slot="startIcon" class="oj-ux-ico-settings"></span>
          Borderless
          {renderMenu("myMenu8")}
        </oj-menu-button>

        <oj-menu-button chroming="solid" id="menuButton9">
          <span slot="startIcon" class="oj-ux-ico-settings"></span>
          Solid
          {renderMenu("myMenu9")}
        </oj-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Sizes</h6>
      <div class="oj-sm-flex oj-sm-flex-wrap oj-sm-column-gap-3x oj-sm-row-gap-3x">
        <oj-menu-button id="menuButton10" class="oj-button-sm">
          <span slot="startIcon" class="oj-ux-ico-settings"></span>
          Small
          {renderMenu("myMenu10")}
        </oj-menu-button>

        <oj-menu-button id="menuButton11">
          <span slot="startIcon" class="oj-ux-ico-settings"></span>
          Default
          {renderMenu("myMenu11")}
        </oj-menu-button>

        <oj-menu-button id="menuButton12" class="oj-button-lg">
          <span slot="startIcon" class="oj-ux-ico-settings"></span>
          Large
          {renderMenu("myMenu12")}
        </oj-menu-button>
      </div>
    </div>
  );
};

export default MenuButton;
