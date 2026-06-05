import { h } from "preact";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/radioset";
import "oj-c/tab-bar-mixed";

type TabBarMixedProps = ComponentProps<"oj-c-tab-bar-mixed">;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];
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

const displayOptions = [
  { label: "Standard", value: "standard" },
  { label: "Icons", value: "icons" }
];

const sizeOptions = [
  { label: "Large", value: "lg" },
  { label: "Medium", value: "md" }
];

const overflowOptions = [
  { label: "Conveyor", value: "conveyor" },
  { label: "Popup", value: "popup" }
];

export const TabBarMixedBasiccorepack = () => {
  const [dynamicTabs, setDynamicTabs] =
    useState<NonNullable<TabBarMixedProps["dynamicTabs"]>>(initialDynamicTabs);
  const [dynamicTabsOverflow, setDynamicTabsOverflow] =
    useState<NonNullable<TabBarMixedProps["dynamicTabsOverflow"]>>("conveyor");
  const [selection, setSelection] = useState("home");
  const [size, setSize] = useState<NonNullable<TabBarMixedProps["size"]>>("lg");
  const [staticTabsDisplay, setStaticTabsDisplay] =
    useState<NonNullable<TabBarMixedProps["staticTabsDisplay"]>>("standard");

  const handleRemove = (event: RemoveEvent) => {
    setDynamicTabs((currentTabs) => currentTabs.filter((item) => item.itemKey !== event.detail.key));
  };

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelection(String(event.detail.value));
  };

  const handleDisplayChanged = (event: RadioValueChangedEvent) => {
    if (event.detail.value === "standard" || event.detail.value === "icons") {
      setStaticTabsDisplay(event.detail.value);
    }
  };

  const handleSizeChanged = (event: RadioValueChangedEvent) => {
    if (event.detail.value === "lg" || event.detail.value === "md") {
      setSize(event.detail.value);
    }
  };

  const handleOverflowChanged = (event: RadioValueChangedEvent) => {
    if (event.detail.value === "conveyor" || event.detail.value === "popup") {
      setDynamicTabsOverflow(event.detail.value);
    }
  };

  return (
    <div id="tab-bar-mixed-container">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout maxColumns={3} direction="row">
          <oj-c-radioset
            id="displayRadioId"
            value={staticTabsDisplay}
            labelHint="Static Tabs Display"
            labelEdge="inside"
            options={displayOptions}
            onvalueChanged={handleDisplayChanged}
          />
          <oj-c-radioset
            id="sizeRadioId"
            value={size}
            labelHint="Size"
            labelEdge="inside"
            options={sizeOptions}
            onvalueChanged={handleSizeChanged}
          />
          <oj-c-radioset
            id="overflowRadioId"
            value={dynamicTabsOverflow}
            labelHint="Dynamic Tabs Overflow"
            labelEdge="inside"
            options={overflowOptions}
            onvalueChanged={handleOverflowChanged}
          />
        </oj-c-form-layout>
      </div>
      <oj-c-tab-bar-mixed
        dynamicTabs={dynamicTabs}
        dynamicTabsOverflow={dynamicTabsOverflow}
        selection={selection}
        onselectionChanged={handleSelectionChanged}
        size={size}
        staticTabs={staticTabs}
        staticTabsDisplay={staticTabsDisplay}
        onojRemove={handleRemove}
      />
    </div>
  );
};

export default TabBarMixedBasiccorepack;
