import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/tab-bar";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type TabKey = "home" | "gettingstarted" | "cookbook" | "stylelab" | "library";
type SelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-tab-bar">["onselectionChanged"]>
>[0];

const tabData = [
  { label: "Home", itemKey: "home" },
  { label: "Getting Started", itemKey: "gettingstarted" },
  { label: "Cookbook", itemKey: "cookbook" },
  { label: "Style Lab", itemKey: "stylelab" },
  { label: "Library", itemKey: "library" }
];

export const TabBarDataProvidercorepack = () => {
  const [selectedItem, setSelectedItem] = useState<TabKey>("home");
  const dataProvider = useMemo(
    () => new MutableArrayDataProvider<TabKey, (typeof tabData)[number]>(tabData, { keyAttributes: "itemKey" }),
    []
  );

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelectedItem(String(event.detail.value) as TabKey);
  };

  return (
    <div id="tabbardemo">
      <oj-c-tab-bar
        selection={selectedItem}
        onselectionChanged={handleSelectionChanged}
        data={dataProvider}
        edge="top"
        aria-label="TabBar with DataProvider"
      />
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-padding-2x-vertical oj-sm-12" />
        <div class="oj-flex-item oj-sm-12 oj-label oj-sm-padding-2x-vertical">
          <label for="curr-selection">Selected tab:&nbsp;</label>
          <span id="curr-selection-value">{selectedItem}</span>
        </div>
      </div>
    </div>
  );
};

export default TabBarDataProvidercorepack;
