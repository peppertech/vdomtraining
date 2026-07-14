import "oj-c/menu-button";
import 'preact';
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type MenuSelection = NonNullable<ComponentProps<"oj-c-menu-button">["selection"]>;
type MenuItems = NonNullable<ComponentProps<"oj-c-menu-button">["items"]>;
type MenuSelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-menu-button">["onselectionChanged"]>
>[0];

const singleSelectItems: MenuItems = [
  {
    type: "selectsingle",
    key: "settings",
    items: [
      { label: "Sliding Navigation", value: "sliding navigation" },
      { label: "Right-to-Left Reading Direction", value: "right-to-left reading direction" },
      { label: "Large Font", value: "large font" },
      { label: "Debug Mode", value: "debug mode" },
      { label: "High Contrast Mode", value: "high contrast mode" }
    ]
  }
];

const multipleSelectItems: MenuItems = [
  {
    type: "selectmultiple",
    key: "settings",
    items: [
      { label: "Sliding Navigation", value: "sliding navigation" },
      { label: "Right-to-Left Reading Direction", value: "right-to-left reading direction" },
      { label: "Large Font", value: "large font" },
      { label: "Debug Mode", value: "debug mode" },
      { label: "High Contrast Mode", value: "high contrast mode" }
    ]
  }
];

const disabledItems: MenuItems = [
  {
    type: "selectsingle",
    key: "items",
    items: [
      { label: "Item 2", value: "item2", disabled: true },
      { label: "Item 3", value: "item3", disabled: true },
      { label: "Item 4", value: "item4", disabled: true }
    ]
  }
];

export const MenuButtonsSelectcorepack = () => {
  const [settingsSelection, setSettingsSelection] = useState<MenuSelection>({
    settings: "large font"
  });
  const [settingsValue, setSettingsValue] = useState('"large font"');
  const [multipleSelection, setMultipleSelection] = useState<MenuSelection>({
    settings: ["large font", "debug mode"]
  });
  const [multipleValue, setMultipleValue] = useState('["large font","debug mode"]');
  const [disabledSelection, setDisabledSelection] = useState<MenuSelection>({
    items: "item2"
  });

  const handleSettingsSelectionChanged = (event: MenuSelectionChangedEvent) => {
    const nextSelection = event.detail.value ?? {};
    setSettingsSelection(nextSelection);
    setSettingsValue(JSON.stringify(nextSelection.settings ?? ""));
  };

  const handleMultipleSelectionChanged = (event: MenuSelectionChangedEvent) => {
    const nextSelection = event.detail.value ?? {};
    setMultipleSelection(nextSelection);
    setMultipleValue(JSON.stringify(nextSelection.settings ?? []));
  };

  const handleDisabledSelectionChanged = (event: MenuSelectionChangedEvent) => {
    setDisabledSelection(event.detail.value ?? {});
  };

  return (
    <div id="menubutton-container">
      <h6 class="oj-sm-margin-8x-top">Single Selection</h6>
      <oj-c-menu-button
        id="menuButton"
        label="Page Settings"
        items={singleSelectItems}
        selection={settingsSelection}
        onselectionChanged={handleSettingsSelectionChanged}
        class="oj-sm-margin-5x-bottom"
      />
      <div class="oj-typography-body-md oj-typography-bold">
        Selected Settings:
        <span id="results"> {settingsValue}</span>
      </div>
      <h6 class="oj-sm-margin-8x-top">Multiple Selection</h6>
      <oj-c-menu-button
        id="menuButton1"
        label="Page Settings"
        items={multipleSelectItems}
        selection={multipleSelection}
        onselectionChanged={handleMultipleSelectionChanged}
        class="oj-sm-margin-5x-bottom"
      />
      <div class="oj-typography-body-md oj-typography-bold">
        Selected Settings:
        <span id="results1"> {multipleValue}</span>
      </div>
      <h6 class="oj-sm-margin-8x-top">Disabled</h6>
      <oj-c-menu-button
        id="menuButton2"
        label="Disabled Items"
        items={disabledItems}
        selection={disabledSelection}
        onselectionChanged={handleDisabledSelectionChanged}
      />
    </div>
  );
};

export default MenuButtonsSelectcorepack;
