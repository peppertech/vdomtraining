import "ojs/ojbutton";
import "ojs/ojmenu";
import type { MenuElement } from "ojs/ojmenu";
import "ojs/ojmenuselectmany";
import type { MenuSelectManyElement } from "ojs/ojmenuselectmany";
import "ojs/ojoption";
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

type MenuOption = {
  value: string;
  label: string;
  disabled?: boolean;
  endIcon?: string;
};

const INLINE_OPTIONS: MenuOption[] = [
  { value: "sliding navigation", label: "Sliding Navigation" },
  { value: "right-to-left reading direction", label: "Right-to-Left Reading Direction" },
  { value: "large font", label: "Large Font" },
  { value: "debug mode", label: "Debug Mode" },
  { value: "high contrast mode", label: "High Contrast Mode" },
];

const DISABLED_OPTIONS: MenuOption[] = [
  { value: "item2", label: "Item 2" },
  { value: "item3", label: "Item 3", disabled: true },
  { value: "item4", label: "Item 4" },
];

const PRIMARY_OPTIONS: MenuOption[] = [
  { value: "bookmark", label: "Show Bookmarks", endIcon: "oj-ux-ico-bookmark" },
  { value: "toolbar", label: "Show Toolbar", endIcon: "oj-ux-ico-toolbar" },
  { value: "sidebar", label: "Show Side Bar", endIcon: "oj-ux-ico-side-bar" },
];

const SECONDARY_OPTIONS: MenuOption[] = [
  { value: "bold", label: "Bold", endIcon: "oj-ux-ico-bold" },
  { value: "italics", label: "Italics", endIcon: "oj-ux-ico-italics" },
  { value: "underline", label: "Underline", endIcon: "oj-ux-ico-underline" },
  { value: "strikethrough", label: "Strikethrough", endIcon: "oj-ux-ico-strikethrough" },
];

const ICON_SIZE = "oj-ux-icon-size-12x";

const renderMenuSelectManyOptions = (options: MenuOption[]) =>
  options.map((option) => (
    <oj-option key={option.value} value={option.value} disabled={option.disabled}>
      {option.endIcon ? <span slot="endIcon" class={`${option.endIcon}`}></span> : null}
      {option.label}
    </oj-option>
  ));

const MenuSelectMany = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("None");
  const [selectedMenuItemSub, setSelectedMenuItemSub] = useState<string>("None");
  const [inlineSettings, setInlineSettings] = useState<string[]>(["large font"]);
  const [disabledSettings, setDisabledSettings] = useState<string[]>(["item2"]);
  const [primarySelection, setPrimarySelection] = useState<string[]>(["bookmark", "toolbar"]);
  const [secondarySelection, setSecondarySelection] = useState<string[]>(["bold"]);

  const inlineOptions = useMemo(() => renderMenuSelectManyOptions(INLINE_OPTIONS), []);
  const disabledOptions = useMemo(() => renderMenuSelectManyOptions(DISABLED_OPTIONS), []);
  const primaryOptions = useMemo(() => renderMenuSelectManyOptions(PRIMARY_OPTIONS), []);
  const secondaryOptions = useMemo(() => renderMenuSelectManyOptions(SECONDARY_OPTIONS), []);

  const handleInlineSelection = useCallback((event: MenuSelectManyElement.valueChanged) => {
    const value = (event.detail.value ?? []) as string[];
    setInlineSettings(value);
  }, []);

  const handleDisabledSelection = useCallback((event: MenuSelectManyElement.valueChanged) => {
    const value = (event.detail.value ?? []) as string[];
    setDisabledSettings(value);
  }, []);

  const handlePrimarySelection = useCallback((event: MenuSelectManyElement.valueChanged) => {
    const value = (event.detail.value ?? []) as string[];
    setPrimarySelection(value);
  }, []);

  const handleSecondarySelection = useCallback((event: MenuSelectManyElement.valueChanged) => {
    const value = (event.detail.value ?? []) as string[];
    setSecondarySelection(value);
  }, []);

  const handleMenuAction = useCallback((event: MenuElement.ojMenuAction) => {
    const value = event.detail.selectedValue ?? "None";
    setSelectedMenuItem(value);
  }, []);

  const handleMenuActionSub = useCallback((event: MenuElement.ojMenuAction) => {
    const value = event.detail.selectedValue ?? "None";
    setSelectedMenuItemSub(value);
  }, []);

  const formatSelectionText = (values: string[]) => (values.length > 0 ? values.join(", ") : "None");

  return (
    <div id="menubutton-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Inline Options</h6>
      <oj-menu-button id="menuButtonInline" class="oj-sm-margin-5x-bottom">
        Page Settings
        <oj-menu
          id="menuInline"
          slot="menu"
          aria-label="menu with actions"
          onojMenuAction={handleMenuAction}
        >
          <oj-menu-select-many value={inlineSettings} onvalueChanged={handleInlineSelection}>
            {inlineOptions}
          </oj-menu-select-many>
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Last selected menu item:
        <span class="oj-sm-margin-2x-start">{selectedMenuItem}</span>
      </div>
      <div class="oj-typography-body-md oj-typography-bold">
        Selected Settings:
        <span class="oj-sm-margin-2x-start">{formatSelectionText(inlineSettings)}</span>
      </div>

      <h6 class="oj-sm-margin-8x-top">Disabled</h6>
      <oj-menu-button id="menuButtonDisabled" class="oj-sm-margin-5x-bottom">
        Disabled Items
        <oj-menu id="menuDisabled" slot="menu" aria-label="menu with disabled actions">
          <oj-menu-select-many value={disabledSettings} disabled onvalueChanged={handleDisabledSelection}>
            {disabledOptions}
          </oj-menu-select-many>
        </oj-menu>
      </oj-menu-button>

      <h6 class="oj-sm-margin-8x-top">Submenu</h6>
      <oj-menu-button id="menuButtonSub" class="oj-sm-margin-5x-bottom">
        View
        <oj-menu
          id="menuPrimary"
          slot="menu"
          aria-label="menu with actions"
          onojMenuAction={handleMenuActionSub}
        >
          <oj-menu-select-many value={primarySelection} onvalueChanged={handlePrimarySelection}>
            {primaryOptions}
          </oj-menu-select-many>
          <oj-option>---</oj-option>
          <oj-option value="secondary">
            Select Font
            <oj-menu id="menuSecondary" slot="menu" aria-label="font selection menu">
              <oj-menu-select-many value={secondarySelection} onvalueChanged={handleSecondarySelection}>
                {secondaryOptions}
              </oj-menu-select-many>
            </oj-menu>
          </oj-option>
        </oj-menu>
      </oj-menu-button>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Last selected menu item:
        <span class="oj-sm-margin-2x-start">{selectedMenuItemSub}</span>
      </div>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Main menu item:
        <span class="oj-sm-margin-2x-start">{formatSelectionText(primarySelection)}</span>
      </div>
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-bottom">
        Select Font item:
        <span class="oj-sm-margin-2x-start">{formatSelectionText(secondarySelection)}</span>
      </div>
    </div>
  );
};

export default MenuSelectMany;
