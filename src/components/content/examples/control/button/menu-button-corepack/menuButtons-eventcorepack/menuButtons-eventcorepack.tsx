import "oj-c/menu-button";
import 'preact';
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";

type MenuItems = NonNullable<ComponentProps<"oj-c-menu-button">["items"]>;
type MenuActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-menu-button">["onojMenuAction"]>
>[0];
type MenuSelectionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-menu-button">["onojMenuSelection"]>
>[0];

export const MenuButtonsEventcorepack = () => {
  const [selectedItem, setSelectedItem] = useState("(None selected yet)");

  const items = useMemo<MenuItems>(
    () => [
      {
        label: "Zoom In",
        key: "zoomin",
        startIcon: { class: "oj-ux-ico-zoom-in" }
      },
      {
        label: "Zoom Out",
        key: "zoomout",
        startIcon: { class: "oj-ux-ico-zoom-out" }
      },
      { type: "separator" },
      {
        label: "Print...",
        key: "print",
        disabled: true,
        startIcon: { class: "oj-ux-ico-zoom-print" }
      },
      { type: "separator" },
      {
        type: "submenu",
        label: "Drink",
        items: [
          {
            type: "selectsingle",
            key: "drink",
            items: [
              { label: "Tea", value: "tea" },
              { label: "Water", value: "water" },
              { label: "Coffee", value: "coffee" }
            ]
          }
        ]
      },
      {
        type: "submenu",
        label: "Font",
        items: [
          {
            type: "selectmultiple",
            key: "font",
            items: [
              { label: "Bold", value: "bold" },
              { label: "Italic", value: "italic" },
              { label: "Underline", value: "underline" }
            ]
          }
        ]
      }
    ],
    []
  );

  const handleMenuAction = (event: MenuActionEvent) => {
    setSelectedItem(String(event.detail.key));
  };

  const handleMenuSelection = (event: MenuSelectionEvent) => {
    setSelectedItem(
      `${String(event.detail.value)} (group key = ${String(event.detail.menuSelectionGroupKey)})`
    );
  };

  return (
    <div id="menuButtons-container">
      <h6>MenuButton Using Event</h6>
      <oj-c-menu-button
        id="menuButton"
        label="Actions"
        items={items}
        onojMenuAction={handleMenuAction}
        onojMenuSelection={handleMenuSelection}
        class="oj-sm-margin-5x-bottom"
      />
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results"> {selectedItem}</span>
      </div>
    </div>
  );
};

export default MenuButtonsEventcorepack;
