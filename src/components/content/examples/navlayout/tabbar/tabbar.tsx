import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojradioset";
import "ojs/ojoption";
import "ojs/ojswitch";
import "ojs/ojlabel";
import "ojs/ojnavigationlist";
import { ojTabBar } from "ojs/ojnavigationlist";
import { ojSwitch } from "ojs/ojswitch";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type TabBarDisplay = "all" | "icons";
type TabBarEdge = "top" | "bottom";

type TabItem = {
  id: string;
  name: string;
  icons: string;
};

const itemTemplate = (context: ojTabBar.ItemContext<TabItem["id"], TabItem>) => {
  return (
    <li>
      <a href="#">
        <span class={`oj-tabbar-item-icon ${context.data.icons}`} aria-hidden="true"></span>
        <span class="oj-tabbar-item-label">{context.data.name}</span>
      </a>
    </li>
  );
};

export const TabBar = () => {
  const [display, setDisplay] = useState<TabBarDisplay>("all");
  const [edge, setEdge] = useState<TabBarEdge>("top");
  const [isCondense, setCondense] = useState<boolean>(false);
  const [showDividers, setShowDividers] = useState<boolean>(false);
  const [contrastBackground, setContrastBackground] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TabItem["id"]>("dashboard");

  const tabs = useMemo<TabItem[]>(
    () => [
      { id: "dashboard", name: "Dashboard", icons: "oj-ux-ico-dashboard" },
      { id: "customers", name: "Customers", icons: "oj-ux-ico-contact-group" },
      { id: "projects", name: "Projects", icons: "oj-ux-ico-apps" },
      { id: "reports", name: "Reports", icons: "oj-ux-ico-bar-chart" },
      { id: "settings", name: "Settings", icons: "oj-ux-ico-settings" },
    ],
    [],
  );

  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<TabItem["id"], TabItem>(tabs, {
        keyAttributes: "id",
      }),
    [tabs],
  );

  const handleDisplayChanged = useCallback(
    (event: CustomEvent<{ value: TabBarDisplay | null }>) => {
      if (event.detail.value) {
        setDisplay(event.detail.value);
      }
    },
    [],
  );

  const handleEdgeChanged = useCallback(
    (event: CustomEvent<{ value: TabBarEdge | null }>) => {
      if (event.detail.value) {
        setEdge(event.detail.value);
      }
    },
    [],
  );

  const coerceSwitchValue = (value: unknown) => value === true || value === "on";

  const handleCondenseChanged = useCallback(
    (event: CustomEvent<{ value: ojSwitch["value"] }>) => {
      setCondense(coerceSwitchValue(event.detail.value));
    },
    [],
  );

  const handleDividerChanged = useCallback(
    (event: CustomEvent<{ value: ojSwitch["value"] }>) => {
      setShowDividers(coerceSwitchValue(event.detail.value));
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
    (event: ojTabBar.selectionChanged<TabItem["id"], TabItem>) => {
      if (event.detail.value) {
        setSelectedItem(event.detail.value);
      }
    },
    [],
  );

  const controlSurfaceClass = `oj-panel ${contrastBackground ? "oj-bg-neutral-190 oj-text-color-primary-contrast" : "oj-bg-neutral-30"} oj-sm-margin-4x-bottom`;
  const tabBarContainerClass = `${contrastBackground ? "oj-bg-neutral-190 oj-text-color-primary-contrast oj-sm-padding-2x" : ""}`;
  const tabBarClass = showDividers ? "oj-tabbar-item-dividers" : undefined;
  const layoutValue = isCondense ? "condense" : "stretch";

  return (
    <div id="tabbardemo" class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class={controlSurfaceClass}>
        <div class="oj-flex">
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-radioset
              id="displayRadioId"
              labelHint="Display"
              labelEdge="inside"
              value={display}
              onvalueChanged={handleDisplayChanged}
            >
              <oj-option id="displayAll" value="all">
                All
              </oj-option>
              <oj-option id="displayIcons" value="icons">
                Icons
              </oj-option>
            </oj-radioset>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-radioset
              id="edgeRadioId"
              labelHint="Edge"
              labelEdge="inside"
              value={edge}
              onvalueChanged={handleEdgeChanged}
            >
              <oj-option id="edgeTop" value="top">
                Top
              </oj-option>
              <oj-option id="edgeBottom" value="bottom">
                Bottom
              </oj-option>
            </oj-radioset>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="condenseLabel" for="condenseSwitch">
              Condense
            </oj-label>
            <oj-switch
              id="condenseSwitch"
              value={isCondense}
              onvalueChanged={handleCondenseChanged}
            ></oj-switch>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-switch
              id="dividerSwitch"
              labelHint="Divider"
              labelEdge="inside"
              value={showDividers}
              onvalueChanged={handleDividerChanged}
            ></oj-switch>
          </div>
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-switch
              id="contrastSwitch"
              labelHint="Dark Background"
              labelEdge="inside"
              value={contrastBackground}
              onvalueChanged={handleContrastChanged}
            ></oj-switch>
          </div>
        </div>
      </div>

      <div id="tabbarcontainer" class={tabBarContainerClass}>
        <oj-tab-bar
          class={tabBarClass}
          data={dataProvider}
          selection={selectedItem}
          display={display}
          edge={edge}
          layout={layoutValue}
          onselectionChanged={handleSelectionChanged}
        >
          <template slot="itemTemplate" render={itemTemplate}></template>
        </oj-tab-bar>
      </div>

      <div class="oj-sm-margin-4x-top">
        <p class="oj-typography-bold">
          Last selected list item:&nbsp;
          <span id="results">{selectedItem}</span>
        </p>
      </div>
    </div>
  );
};

export default TabBar;
