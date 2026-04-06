import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import "ojs/ojdrawerlayout";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";
import { ButtonElement } from "ojs/ojbutton";

import { NavList } from "./navlist";
import { Accordion } from "./accordion";
import { ActionCard } from "./actioncard";
import { ActionCardCorePack } from "./actionCardCorePack";
import { TabBar } from "./tabbar";
import { Dialog } from "./dialog";
import { Popup } from "./popup";

type NavLayoutComponent = {
  id: number;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
};

const navLayoutComponents: NavLayoutComponent[] = [
  {
    id: 1,
    name: "Navigation List",
    image: "oj-ux-icon-size-12x oj-ux-ico-navigation",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Accordion & Collapsible",
    image: "oj-ux-icon-size-12x oj-ux-ico-accordion",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Action Card",
    image: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
    isAvailable: true,
  },
  {
    id: 8,
    name: "Action Card (Core Pack)",
    image: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 4,
    name: "Tab Bar",
    image: "oj-ux-icon-size-12x  oj-ux-ico-tab-bar",
    isAvailable: true,
  },
  {
    id: 5,
    name: "Dialog",
    image: "oj-ux-icon-size-12x oj-ux-ico-dialog",
    isAvailable: true,
  },
  {
    id: 6,
    name: "Popup",
    image: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
    isAvailable: true,
  },
  {
    id: 7,
    name: "Drawer Layout",
    image: "oj-ux-icon-size-12x  oj-ux-ico-drawer",
    isAvailable: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  NavLayoutComponent["id"],
  NavLayoutComponent
>(navLayoutComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<NavLayoutComponent["id"]>;

const DrawerLayoutDemo = () => {
  const [opened, setOpened] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content demo-full-height">
      <oj-button
        onojAction={toggleDrawer}
        aria-label="Toggle drawer"
        label="Toggle End Drawer"
        chroming="callToAction"
      ></oj-button>
      <oj-drawer-layout endOpened={opened} class="demo-full-height">
        <div class="oj-flex oj-sm-flex-items-1">
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
            <h2 class="oj-typography-heading-sm"> Navigation List </h2>
            <NavList />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
            <h2 class="oj-typography-heading-sm"> Accordion </h2>
            <Accordion />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
            <h2 class="oj-typography-heading-sm"> Action Card </h2>
            <ActionCard />
          </div>
        </div>
        <div
          slot="end"
          class="oj-color-invert nav-drawer-light-bg demo-full-height"
        >
          <div class="demo-drawer-header">
            <h6>Drawer Content</h6>
            <oj-button
              display="icons"
              chroming="borderless"
              onojAction={toggleDrawer}
            >
              <span slot="startIcon" class="oj-ux-ico-close"></span>
              Close
            </oj-button>
          </div>
          <div class="demo-padding demo-form-container oj-typography-body-md">
            <p>Add any kind of content that you like in here.</p>
            <p>
              You can also set the drawer to overlay instead of reflowing the
              page content.
            </p>
            <p>
              If you want a drawer that covers the full page instead of this
              content area, you can use the oj-drawer-popup component.
            </p>
          </div>
        </div>
      </oj-drawer-layout>
    </div>
  );
};

const NavLayoutHome = () => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<NavLayoutComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const [isComponentAvailable, setIsComponentAvailable] = useState(false);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        NavLayoutComponent["id"],
        NavLayoutComponent
      >,
    ) => {
      return (
        <li>
          <oj-action-card>
            <div class="component-item" key={item.data.id}>
              <div class="componentImage">
                {item.data.isCorePack ? (
                  <span class="demo-badge-position oj-sm-margin-2x-vertical oj-badge oj-badge-end oj-badge-success oj-badge-sm">
                    Core Pack
                  </span>
                ) : null}
                <div
                  class="oj-helper-text-align-center"
                  style={{ paddingTop: "25px" }}
                >
                  <div className={item.data.image}></div>
                </div>
                <div class="oj-flex-item oj-text-sm componentInfo oj-typography-body-md oj-typography-bold">
                  {item.data.name}
                </div>
              </div>
            </div>
          </oj-action-card>
        </li>
      );
    },
    [selectedItems],
  );

  const ComponentDetail = useCallback(() => {
    switch (activeComponentId) {
      case 1:
        return <NavList />;
      case 2:
        return <Accordion />;
      case 3:
        return <ActionCard />;
      case 4:
        return <TabBar />;
      case 5:
        return <Dialog />;
      case 6:
        return <Popup />;
      case 7:
        return <DrawerLayoutDemo />;
      case 8:
        return <ActionCardCorePack />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleHomeNavigation = (_event: ButtonElement.ojAction) => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(new KeySetImpl([]) as KeySet<NavLayoutComponent["id"]>);
  };

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as NavLayoutComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<NavLayoutComponent["id"]>;
      setSelectedItems(selection);

      const selectedComponent = navLayoutComponents.find(
        (component) => component.id === selectedKey,
      );
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));
    }
  };

  return (
    <div class="component-wrapper">
      {!showComponentDetail ? (
        <oj-list-view
          data={dataProvider}
          selectionMode="single"
          selected={selectedItems}
          gridlines={gridlines}
          onselectedChanged={handleSelectedChanged}
          display="card"
          class="listview-sizing"
        >
          <template slot="itemTemplate" render={renderListItem}></template>
        </oj-list-view>
      ) : (
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
          <oj-button class="breadcrumb-wrapper"  label=" << Home " onojAction={handleHomeNavigation} />
          {isComponentAvailable ? (
            ComponentDetail()
          ) : (
            <div class="comingsoon">Coming soon....</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavLayoutHome;
