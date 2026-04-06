import { h, JSX } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
//import "ojs/ojmenubutton";
import "ojs/ojmenu";
import "ojs/ojoption";
import type { MenuElement } from "ojs/ojmenu";

type MenuItem = {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: string;
  endIcon?: string;
};

const START_ICON_CLASS = "oj-ux-ico-settings oj-button-icon oj-start";
const END_ICON_CLASS = "oj-ux-ico-settings oj-button-icon oj-end";
const buttonGroupStyle: JSX.CSSProperties = { gap: "5px" };

const menuItems: MenuItem[] = [
  {
    id: "actionFavorite",
    label: "Favorite",
    icon: "oj-ux-icon-size-12x oj-ux-ico-favorite",
    endIcon: "oj-ux-icon-size-12x oj-ux-ico-favorite",
  },
  {
    id: "actionShare",
    label: "Share",
    icon: "oj-ux-icon-size-12x oj-ux-ico-share",
    endIcon: "oj-ux-icon-size-12x oj-ux-ico-share",
  },
  {
    id: "actionArchive",
    label: "Archive",
    icon: "oj-ux-icon-size-12x oj-ux-ico-archive",
  },
  {
    id: "actionDelete",
    label: "Delete",
    icon: "oj-ux-icon-size-12x oj-ux-ico-delete",
    disabled: true,
  },
];

type RenderOptions = {
  includeIcons?: boolean;
  includeEndIcons?: boolean;
};

const renderMenuOptions = (items: MenuItem[], { includeIcons, includeEndIcons }: RenderOptions = {}) =>
  items.map((item) => (
    <oj-option key={item.id} id={item.id} value={item.label} disabled={item.disabled}>
      {includeIcons && item.icon ? <span slot="startIcon" class={item.icon}></span> : null}
      <span>{item.label}</span>
      {includeEndIcons && item.endIcon ? <span slot="endIcon" class={item.endIcon}></span> : null}
    </oj-option>
  ));

const DEFAULT_SELECTION = "None";

type SelectionState = {
  text: string;
  icon: string;
};

const MenuButton = () => {
  const [selection, setSelection] = useState<SelectionState>({
    text: DEFAULT_SELECTION,
    icon: DEFAULT_SELECTION,
  });

  const textOptions = useMemo(() => renderMenuOptions(menuItems), []);
  const iconOptions = useMemo(() => renderMenuOptions(menuItems, { includeIcons: true, includeEndIcons: true }), []);

  const handleSelection = useCallback(
    (key: keyof SelectionState) => (event: MenuElement.ojMenuAction) => {
      const value = event.detail.selectedValue ?? DEFAULT_SELECTION;
      setSelection((previous) => ({ ...previous, [key]: value }));
    },
    [],
  );

  return (
    <div id="menuButtons-container" class="oj-sm-margin-2x-bottom">
      <h6>Text MenuButton</h6>
      <div>
        <oj-menu-button id="menuButton1">
          Action
          <oj-menu
            id="myMenu1"
            slot="menu"
            aria-label="menu with actions"
            onojMenuAction={handleSelection("text")}
          >
            {textOptions}
          </oj-menu>
        </oj-menu-button>
      </div>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span class="oj-sm-margin-2x-start">{selection.text}</span>
      </div>

      <h6 class="oj-sm-margin-8x-top">MenuButton with Icon</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={buttonGroupStyle}>
        <oj-menu-button id="menuButton2">
          <span slot="startIcon" class={START_ICON_CLASS}></span>
          Action
          <oj-menu
            id="myMenu2"
            slot="menu"
            aria-label="menu with actions"
            onojMenuAction={handleSelection("icon")}
          >
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton3" display="icons">
          <span slot="startIcon" class={START_ICON_CLASS}></span>
          Action
          <oj-menu
            id="myMenu3"
            slot="menu"
            aria-label="menu with actions"
            onojMenuAction={handleSelection("icon")}
          >
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton4" display="icons">
          <span slot="endIcon" class={END_ICON_CLASS}></span>
          Action
          <oj-menu
            id="myMenu4"
            slot="menu"
            aria-label="menu with actions"
            onojMenuAction={handleSelection("icon")}
          >
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton5" display="icons">
          Action
          <oj-menu
            id="myMenu5"
            slot="menu"
            aria-label="menu with actions"
            onojMenuAction={handleSelection("icon")}
          >
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
      </div>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span class="oj-sm-margin-2x-start">{selection.icon}</span>
      </div>

      <h6 class="oj-sm-margin-8x-top">Disabled MenuButton</h6>
      <div>
        <oj-menu-button id="menuButton6" disabled>
          <span slot="startIcon" class={START_ICON_CLASS}></span>
          Disabled
          <oj-menu id="myMenu6" slot="menu" aria-label="menu with actions">
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Chroming</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={buttonGroupStyle}>
        <oj-menu-button id="menuButton7" chroming="outlined">
          <span slot="startIcon" class={START_ICON_CLASS}></span>
          Outlined
          <oj-menu id="myMenu7" slot="menu" aria-label="menu with actions">
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton8" chroming="borderless">
          <span slot="startIcon" class={START_ICON_CLASS}></span>
          Borderless
          <oj-menu id="myMenu8" slot="menu" aria-label="menu with actions">
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton9" chroming="solid">
          <span slot="startIcon" class={START_ICON_CLASS}></span>
          Solid
          <oj-menu id="myMenu9" slot="menu" aria-label="menu with actions">
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
      </div>

      <h6 class="oj-sm-margin-8x-top">Sizes</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={buttonGroupStyle}>
        <oj-menu-button id="menuButton10" class="oj-button-sm">
          <span slot="startIcon" class={START_ICON_CLASS}></span>
          Small
          <oj-menu id="myMenu10" slot="menu" aria-label="menu with actions">
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton11">
          <span slot="startIcon" class={START_ICON_CLASS}></span>
          Default
          <oj-menu id="myMenu11" slot="menu" aria-label="menu with actions">
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
        <oj-menu-button id="menuButton12" class="oj-button-lg">
          <span slot="startIcon" class={START_ICON_CLASS}></span>
          Large
          <oj-menu id="myMenu12" slot="menu" aria-label="menu with actions">
            {iconOptions}
          </oj-menu>
        </oj-menu-button>
      </div>
    </div>
  );
};

export default MenuButton;
