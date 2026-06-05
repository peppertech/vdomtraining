import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/radioset";
import "oj-c/tab-bar";
import type { TabData } from "oj-c/tab-bar";

type TabKey =
  | "home"
  | "gettingstarted"
  | "cookbook"
  | "stylelab2"
  | "library"
  | "support"
  | "contactus";
type TabBarProps = ComponentProps<"oj-c-tab-bar">;
type Edge = NonNullable<TabBarProps["edge"]>;
type Layout = NonNullable<TabBarProps["layout"]>;
type Display = NonNullable<TabBarProps["display"]>;
type SelectionChangedEvent = Parameters<NonNullable<TabBarProps["onselectionChanged"]>>[0];
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const edgeOptions = [
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" }
];

const layoutOptions = [
  { label: "Stretch", value: "stretch" },
  { label: "Condense", value: "condense" }
];

const displayOptions = [
  { label: "Standard", value: "standard" },
  { label: "Icons", value: "icons" },
  { label: "Stacked", value: "stacked" }
];

const tabData: TabData<TabKey>[] = [
  {
    label: "Home",
    itemKey: "home",
    icon: {
      type: "class",
      class: "oj-ux-ico-home"
    }
  },
  {
    label: "Getting Started",
    itemKey: "gettingstarted",
    icon: {
      type: "class",
      class: "oj-ux-ico-education"
    }
  },
  {
    label: "Cookbook",
    itemKey: "cookbook",
    icon: {
      type: "class",
      class: "oj-ux-ico-book"
    }
  },
  {
    label: "Style Lab",
    itemKey: "stylelab2",
    icon: {
      type: "class",
      class: "oj-ux-ico-color-palette"
    }
  },
  {
    label: "Library",
    itemKey: "library",
    icon: {
      type: "class",
      class: "oj-ux-ico-library"
    }
  },
  {
    label: "Support",
    itemKey: "support",
    icon: {
      type: "class",
      class: "oj-ux-ico-chat-on"
    }
  },
  {
    label: "Contact us",
    itemKey: "contactus",
    icon: {
      type: "class",
      class: "oj-ux-ico-contact"
    }
  }
];

export const TabBarBasiccorepack = () => {
  const [selectedItem, setSelectedItem] = useState<TabKey>("home");
  const [edge, setEdge] = useState<Edge>("top");
  const [layout, setLayout] = useState<Layout>("stretch");
  const [display, setDisplay] = useState<Display>("standard");

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelectedItem(String(event.detail.value) as TabKey);
  };

  const handleLayoutChanged = (event: RadioValueChangedEvent) => {
    setLayout(String(event.detail.value) as Layout);
  };

  const handleEdgeChanged = (event: RadioValueChangedEvent) => {
    setEdge(String(event.detail.value) as Edge);
  };

  const handleDisplayChanged = (event: RadioValueChangedEvent) => {
    setDisplay(String(event.detail.value) as Display);
  };

  return (
    <div id="tab-bar-container">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout maxColumns={4} direction="row">
          <oj-c-radioset
            id="layoutRadioId"
            value={layout}
            labelHint="Layout"
            labelEdge="inside"
            options={layoutOptions}
            onvalueChanged={handleLayoutChanged}
          />
          <oj-c-radioset
            id="edgeRadioId"
            value={edge}
            labelHint="Edge"
            labelEdge="inside"
            options={edgeOptions}
            onvalueChanged={handleEdgeChanged}
          />
          <oj-c-radioset
            id="displayRadioId"
            value={display}
            labelHint="Display"
            labelEdge="inside"
            options={displayOptions}
            onvalueChanged={handleDisplayChanged}
          />
        </oj-c-form-layout>
      </div>
      <div id="tabbarcontainer">
        <oj-c-tab-bar
          data={tabData}
          selection={selectedItem}
          onselectionChanged={handleSelectionChanged}
          edge={edge}
          layout={layout}
          display={display}
          aria-label="Basic TabBar"
        />
      </div>
      <div class="oj-sm-margin-4x-top">
        <p class="bold">
          Last selected list item:
          <span id="results">{selectedItem}</span>
        </p>
      </div>
    </div>
  );
};

export default TabBarBasiccorepack;
