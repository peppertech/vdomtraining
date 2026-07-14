import "oj-c/tab-bar-mixed";
import 'preact';
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type TabBarMixedProps = ComponentProps<"oj-c-tab-bar-mixed">;
type SelectionChangedEvent = Parameters<
  NonNullable<TabBarMixedProps["onselectionChanged"]>
>[0];
type RemoveEvent = Parameters<NonNullable<TabBarMixedProps["onojRemove"]>>[0];

const staticTabs = [
  {
    itemKey: "home",
    label: "Home",
    icon: {
      type: "class",
      class: "oj-ux-ico-home"
    }
  },
  {
    itemKey: "resources",
    label: "Resources",
    icon: {
      type: "class",
      class: "oj-ux-ico-library"
    }
  }
] satisfies NonNullable<TabBarMixedProps["staticTabs"]>;

const initialDynamicTabs = [
  { badge: 3, itemKey: "lisa", label: "Lisa Hernandez" },
  { itemKey: "tim", label: "Tim Anderson" },
  { itemKey: "stephanie", label: "Stephanie Kim" },
  { itemKey: "adam", label: "Adam Susanto" },
  { badge: 7, itemKey: "denis", label: "Denis Dorsey" },
  { itemKey: "lochlan", label: "Lochlan Camacho" },
  { badge: 1, itemKey: "izaak", label: "Izaak Calderon" },
  { itemKey: "nancy", label: "Nancy Richardson" }
] satisfies NonNullable<TabBarMixedProps["dynamicTabs"]>;

const overflowIcon = {
  type: "class",
  class: "oj-ux-ico-contact"
} satisfies NonNullable<TabBarMixedProps["dynamicTabsOverflowIcon"]>;

export const TabBarMixedOverflowIconcorepack = () => {
  const [dynamicTabs, setDynamicTabs] =
    useState<NonNullable<TabBarMixedProps["dynamicTabs"]>>(initialDynamicTabs);
  const [selection, setSelection] = useState("home");

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelection(String(event.detail.value));
  };

  const handleRemove = (event: RemoveEvent) => {
    setDynamicTabs((currentTabs) => currentTabs.filter((item) => item.itemKey !== event.detail.key));
  };

  return (
    <div id="tab-bar-mixed-container">
      <oj-c-tab-bar-mixed
        dynamicTabs={dynamicTabs}
        dynamicTabsOverflow="popup"
        dynamicTabsOverflowIcon={overflowIcon}
        selection={selection}
        onselectionChanged={handleSelectionChanged}
        size="md"
        staticTabs={staticTabs}
        staticTabsDisplay="icons"
        onojRemove={handleRemove}
      />
    </div>
  );
};

export default TabBarMixedOverflowIconcorepack;
