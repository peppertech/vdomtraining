import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojoption";
import { MenuElement } from "ojs/ojmenu";

type SelectionState = {
  single: string;
  icons: string;
  submenu: string;
};

type MenuOptionConfig = {
  id: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  startIcon?: string;
  endIcon?: string;
  isDivider?: boolean;
};

const DEFAULT_SELECTION = "None";

const singleMenuOptions: MenuOptionConfig[] = [
  { id: "zoomin", value: "Zoom In", startIcon: "oj-ux-ico-zoom-in" },
  { id: "zoomout", value: "Zoom Out", startIcon: "oj-ux-ico-zoom-out" },
  { id: "divider", isDivider: true },
  { id: "save", value: "Save", startIcon: "oj-ux-ico-save" },
  { id: "print", value: "Print...", startIcon: "oj-ux-ico-print", disabled: true },
];

const iconMenuOptions: MenuOptionConfig[] = [
  {
    id: "iconFont1",
    value: "Icon Font",
    startIcon: "oj-ux-ico-home",
    endIcon: "oj-ux-ico-home",
  },
  {
    id: "iconFont3",
    value: "Icon Font Disabled",
    startIcon: "oj-ux-ico-chat",
    endIcon: "oj-ux-ico-chat",
    disabled: true,
  },
];

const submenuPrimaryOptions: MenuOptionConfig[] = [
  { id: "cut", value: "Reply", startIcon: "oj-ux-ico-email-reply" },
  { id: "copy", value: "ReplyAll", startIcon: "oj-ux-ico-email-reply-all", disabled: true },
  { id: "paste", value: "Forward", startIcon: "oj-ux-ico-email-forward", disabled: true },
];

const submenuSecondaryOptions: MenuOptionConfig[] = [
  { id: "inbox", value: "Inbox", startIcon: "oj-ux-ico-inbox" },
  { id: "archive", value: "Archive", startIcon: "oj-ux-ico-archive" },
];

const renderMenuOptions = (options: MenuOptionConfig[]) =>
  options.map((option) => {
    if (option.isDivider) {
      return (
        <oj-option key={option.id} id={option.id}>
          ---------------------------------
        </oj-option>
      );
    }

    const value = option.value ?? option.label ?? "";

    return (
      <oj-option key={option.id} id={option.id} value={value} disabled={option.disabled}>
        {option.startIcon ? <span slot="startIcon" class={option.startIcon}></span> : null}
        {option.label ?? option.value}
        {option.endIcon ? <span slot="endIcon" class={option.endIcon}></span> : null}
      </oj-option>
    );
  });

const Menu = () => {
  const [selectedItems, setSelectedItems] = useState<SelectionState>({
    single: DEFAULT_SELECTION,
    icons: DEFAULT_SELECTION,
    submenu: DEFAULT_SELECTION,
  });

  const handleSelection = useCallback(
    (key: keyof SelectionState) => (event: MenuElement.ojMenuAction) => {
      const value = event.detail.selectedValue ?? DEFAULT_SELECTION;
      setSelectedItems((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const singleOptions = useMemo(() => renderMenuOptions(singleMenuOptions), []);
  const iconOptions = useMemo(() => renderMenuOptions(iconMenuOptions), []);
  const submenuPrimary = useMemo(() => renderMenuOptions(submenuPrimaryOptions), []);
  const submenuSecondary = useMemo(() => renderMenuOptions(submenuSecondaryOptions), []);

  return (
    <div id="menubutton-container">
      <h6>Single Menu</h6>
      <oj-menu-button id="menuButton2" class="oj-sm-margin-5x-bottom">
        Actions
        <oj-menu
          id="myMenu2"
          slot="menu"
          aria-label="menu with actions items"
          onojMenuAction={handleSelection("single")}
        >
          {singleOptions}
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span class="oj-sm-margin-2x-start">{selectedItems.single}</span>
      </div>

      <h6 class="oj-sm-margin-8x-top">Menu with Icons</h6>
      <oj-menu-button id="menuButton" class="oj-sm-margin-5x-bottom">
        Item Icons
        <oj-menu
          id="myMenu"
          slot="menu"
          aria-label="menu with icons"
          onojMenuAction={handleSelection("icons")}
        >
          {iconOptions}
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span class="oj-sm-margin-2x-start">{selectedItems.icons}</span>
      </div>

      <h6 class="oj-sm-margin-8x-top">Submenu</h6>
      <oj-menu-button id="menuButton1" class="oj-sm-margin-5x-bottom">
        Message
        <oj-menu
          id="myMenu1"
          slot="menu"
          aria-label="menu with actions items and submenu"
          onojMenuAction={handleSelection("submenu")}
        >
          {submenuPrimary}
          <oj-option>---------------------------------</oj-option>
          <oj-option id="zoom">
            <span>Move to</span>
            <oj-menu
              id="zoom_menu"
              aria-label="menu with actions"
              onojMenuAction={handleSelection("submenu")}
            >
              {submenuSecondary}
            </oj-menu>
          </oj-option>
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span class="oj-sm-margin-2x-start">{selectedItems.submenu}</span>
      </div>

      <h6 class="oj-sm-margin-8x-top">Disabled</h6>
      <oj-menu-button id="menuButton4" class="oj-sm-margin-5x-bottom">
        File
        <oj-menu id="myMenu4" slot="menu" disabled aria-label="menu with disabled items">
          <oj-option id="iconFont5" value="Home Icon">
            New
          </oj-option>
          <oj-option id="iconFont6" value="Icon Font Disabled" disabled>
            Open
          </oj-option>
          <oj-option id="iconFont7" value="Chat On Icon">
            Save
          </oj-option>
          <oj-option id="iconFont8" value="Chat Off Icon">
            Save As
          </oj-option>
        </oj-menu>
      </oj-menu-button>
    </div>
  );
};

export default Menu;
