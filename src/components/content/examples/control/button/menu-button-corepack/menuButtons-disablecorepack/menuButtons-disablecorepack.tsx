import { h } from "preact";
import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/menu-button";
import "oj-c/radioset";

type MenuItems = NonNullable<ComponentProps<"oj-c-menu-button">["items"]>;
type DisabledState = "false" | "true";
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const itemDisabledItems = [
  { value: "false", label: "Menu Item Enabled" },
  { value: "true", label: "Menu Item Disabled" }
];

export const MenuButtonsDisablecorepack = () => {
  const [itemDisabledState, setItemDisabledState] = useState<DisabledState>("false");

  const items = useMemo<MenuItems>(
    () => [
      {
        label: "Zoom In",
        key: "zoomin"
      },
      {
        label: "Zoom Out",
        key: "zoomout",
        disabled: itemDisabledState === "true"
      }
    ],
    [itemDisabledState]
  );

  const handleDisabledStateChanged = (event: RadioValueChangedEvent) => {
    const nextValue = event.detail.value;
    if (nextValue === "false" || nextValue === "true") {
      setItemDisabledState(nextValue);
    }
  };

  return (
    <div id="menubutton-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-radioset
          direction="row"
          value={itemDisabledState}
          labelHint="Disabled Menu Item"
          aria-controls="menuButton"
          options={itemDisabledItems}
          onvalueChanged={handleDisabledStateChanged}
        />
      </div>
      <oj-c-menu-button
        id="menuButton"
        label="Actions"
        items={items}
        class="oj-sm-margin-5x-bottom"
      />
    </div>
  );
};

export default MenuButtonsDisablecorepack;
