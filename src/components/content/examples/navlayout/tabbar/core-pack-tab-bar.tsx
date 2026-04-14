import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/tab-bar";
import "ojs/ojradioset";
import "ojs/ojoption";
import "ojs/ojlabel";
import "ojs/ojswitch";
import { ojSwitch } from "ojs/ojswitch";

type TabDisplay = "standard" | "icons";
type TabEdge = "top" | "bottom";
type TabLayout = "stretch" | "condense";
type TabOverflow = "hidden" | "popup" | "conveyor";
type TabTruncation = "none" | "progressive";

type CoreTab = {
  itemKey: string;
  label: string;
  icon?: {
    type: "class";
    class: string;
  };
  badge?: number;
  metadata?: string;
};

const CORE_TABS: CoreTab[] = [
  {
    itemKey: "dashboard",
    label: "Dashboard",
    icon: { type: "class", class: "oj-ux-ico-dashboard" },
    metadata: "Overview",
  },
  {
    itemKey: "customers",
    label: "Customers",
    icon: {
      type: "class",
      class: "oj-ux-ico-contact-group",
    },
    metadata: "Accounts",
  },
  {
    itemKey: "projects",
    label: "Projects",
    icon: { type: "class", class: "oj-ux-ico-apps" },
    metadata: "Status",
  },
  {
    itemKey: "reports",
    label: "Reports",
    icon: { type: "class", class: "oj-ux-ico-bar-chart" },
    badge: 2,
  },
  {
    itemKey: "settings",
    label: "Settings",
    icon: { type: "class", class: "oj-ux-ico-settings" },
  },
];

const coerceSwitchValue = (value: unknown) => value === true || value === "on";

const CorePackTabBar = () => {
  const [display, setDisplay] = useState<TabDisplay>("standard");
  const [edge, setEdge] = useState<TabEdge>("top");
  const [layout, setLayout] = useState<TabLayout>("stretch");
  const [overflow, setOverflow] = useState<TabOverflow>("hidden");
  const [truncation, setTruncation] = useState<TabTruncation>("none");
  const [contrastBackground, setContrastBackground] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(
    CORE_TABS[0].itemKey,
  );

  const handleDisplayChanged = useCallback(
    (event: CustomEvent<{ value: TabDisplay | null }>) => {
      if (event.detail.value) {
        setDisplay(event.detail.value);
      }
    },
    [],
  );

  const handleEdgeChanged = useCallback(
    (event: CustomEvent<{ value: TabEdge | null }>) => {
      if (event.detail.value) {
        setEdge(event.detail.value);
      }
    },
    [],
  );

  const handleLayoutChanged = useCallback(
    (event: CustomEvent<{ value: ojSwitch["value"] }>) => {
      setLayout(coerceSwitchValue(event.detail.value) ? "condense" : "stretch");
    },
    [],
  );

  const handleOverflowChanged = useCallback(
    (event: CustomEvent<{ value: ojSwitch["value"] }>) => {
      setOverflow(coerceSwitchValue(event.detail.value) ? "popup" : "hidden");
    },
    [],
  );

  const handleTruncationChanged = useCallback(
    (event: CustomEvent<{ value: ojSwitch["value"] }>) => {
      setTruncation(
        coerceSwitchValue(event.detail.value) ? "progressive" : "none",
      );
    },
    [],
  );

  const handleContrastChanged = useCallback(
    (event: CustomEvent<{ value: ojSwitch["value"] }>) => {
      setContrastBackground(coerceSwitchValue(event.detail.value));
    },
    [],
  );

  const handleSelectionChanged = useCallback(
    (event: CustomEvent<{ value: string | null }>) => {
      if (event.detail.value) {
        setSelectedItem(event.detail.value);
      }
    },
    [],
  );

  const controlSurfaceClass = `oj-panel ${
    contrastBackground
      ? "oj-bg-neutral-190 oj-text-color-primary-contrast"
      : "oj-bg-neutral-30"
  } oj-sm-margin-4x-bottom`;
  const tabBarContainerClass = contrastBackground
    ? "oj-bg-neutral-190 oj-text-color-primary-contrast oj-sm-padding-2x"
    : "";

  return (
    <div
      id="coreTabBarDemo"
      class="oj-web-applayout-max-width oj-web-applayout-content"
    >
      <div class={controlSurfaceClass}>
        <div class="oj-flex">
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-radioset
              id="coreDisplayRadio"
              labelHint="Display"
              labelEdge="inside"
              value={display}
              onvalueChanged={handleDisplayChanged}
            >
              <oj-option id="coreDisplayStandard" value="standard">
                Standard
              </oj-option>
              <oj-option id="coreDisplayIcons" value="icons">
                Icons
              </oj-option>
            </oj-radioset>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-radioset
              id="coreEdgeRadio"
              labelHint="Edge"
              labelEdge="inside"
              value={edge}
              onvalueChanged={handleEdgeChanged}
            >
              <oj-option id="coreEdgeTop" value="top">
                Top
              </oj-option>
              <oj-option id="coreEdgeBottom" value="bottom">
                Bottom
              </oj-option>
            </oj-radioset>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="coreCondenseLabel" for="coreCondenseSwitch">
              Condense
            </oj-label>
            <oj-switch
              id="coreCondenseSwitch"
              value={layout === "condense"}
              onvalueChanged={handleLayoutChanged}
            ></oj-switch>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-switch
              id="coreOverflowSwitch"
              labelHint="Overflow Popup"
              labelEdge="inside"
              value={overflow !== "hidden"}
              onvalueChanged={handleOverflowChanged}
            ></oj-switch>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-switch
              id="coreTruncationSwitch"
              labelHint="Progressive Truncation"
              labelEdge="inside"
              value={truncation === "progressive"}
              onvalueChanged={handleTruncationChanged}
            ></oj-switch>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-switch
              id="coreContrastSwitch"
              labelHint="Dark Background"
              labelEdge="inside"
              value={contrastBackground}
              onvalueChanged={handleContrastChanged}
            ></oj-switch>
          </div>
        </div>
      </div>

      <div id="coreTabBarContainer" class={tabBarContainerClass}>
        <oj-c-tab-bar
          data={CORE_TABS}
          selection={selectedItem}
          display={display}
          edge={edge}
          layout={layout}
          overflow={overflow}
          truncation={truncation}
          onselectionChanged={handleSelectionChanged}
          aria-label="Core Pack tab bar demo"
        ></oj-c-tab-bar>
      </div>

      <div class="oj-sm-margin-4x-top">
        <p class="oj-typography-bold">
          Last selected tab:&nbsp;
          <span id="coreTabBarResults">{selectedItem}</span>
        </p>
      </div>
    </div>
  );
};

export { CorePackTabBar };
