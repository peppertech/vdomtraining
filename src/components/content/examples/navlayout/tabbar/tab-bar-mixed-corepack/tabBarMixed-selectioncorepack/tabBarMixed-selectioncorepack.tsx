import { h } from "preact";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/tab-bar-mixed";

type TabBarMixedProps = ComponentProps<"oj-c-tab-bar-mixed">;
type SelectionChangedEvent = Parameters<
  NonNullable<TabBarMixedProps["onselectionChanged"]>
>[0];
type SelectionActionEvent = Parameters<
  NonNullable<TabBarMixedProps["onojSelectionAction"]>
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

export const TabBarMixedSelectioncorepack = () => {
  const [dynamicTabs, setDynamicTabs] =
    useState<NonNullable<TabBarMixedProps["dynamicTabs"]>>(initialDynamicTabs);
  const [selection, setSelection] = useState("home");
  const [selectedTab, setSelectedTab] = useState("home");

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelection(String(event.detail.value));
  };

  const handleSelectionAction = (event: SelectionActionEvent) => {
    const appendText = event.detail.value === event.detail.previousValue ? " (selected again)" : "";
    setSelectedTab(`${String(event.detail.value)}${appendText}`);
  };

  const handleRemove = (event: RemoveEvent) => {
    setDynamicTabs((currentTabs) => currentTabs.filter((item) => item.itemKey !== event.detail.key));
  };

  return (
    <div id="tab-bar-mixed-container">
      <oj-c-tab-bar-mixed
        staticTabs={staticTabs}
        dynamicTabs={dynamicTabs}
        onojRemove={handleRemove}
        selection={selection}
        onselectionChanged={handleSelectionChanged}
        onojSelectionAction={handleSelectionAction}
      />
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-12 oj-label oj-sm-padding-2x-vertical">
          <label for="curr-selection-value">Selected tab:</label>
          <span id="curr-selection-value"> {selectedTab}</span>
        </div>
      </div>
    </div>
  );
};

export default TabBarMixedSelectioncorepack;
