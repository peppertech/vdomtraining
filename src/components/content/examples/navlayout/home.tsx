import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";
import {
  CatalogBreadcrumb,
  type CatalogBreadcrumbItem,
  formatCorePackLabel,
} from "../../../shared/catalog-breadcrumb";

import { NavList } from "./navlist";
import AccordionHome from "./accordion/home";
import ActionCardHome from "./actioncard/home";
import ConveyorBeltHome from "./conveyorbelt/home";
import DialogHome from "./dialog/home";
import PopupHome from "./popup/home";
import TabBarHome from "./tabbar/home";
import DrawerHome from "./drawer/home";

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
    isCorePack: true,
  },
  {
    id: 3,
    name: "Action Card",
    image: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 4,
    name: "Tab Bar",
    image: "oj-ux-icon-size-12x  oj-ux-ico-tab-bar",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 5,
    name: "Dialog",
    image: "oj-ux-icon-size-12x oj-ux-ico-dialog",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 6,
    name: "Popup",
    image: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 7,
    name: "Drawer Layout",
    image: "oj-ux-icon-size-12x oj-ux-ico-drawer",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 8,
    name: "Conveyor Belt",
    image: "oj-ux-icon-size-12x oj-ux-ico-carousel",
    isAvailable: true,
    isCorePack: true,
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

const NavLayoutHome = () => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<NavLayoutComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const [isComponentAvailable, setIsComponentAvailable] = useState(false);
  const [nestedBreadcrumbItems, setNestedBreadcrumbItems] = useState<
    CatalogBreadcrumbItem[] | null
  >(null);

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
        return (
          <AccordionHome
            onBreadcrumbChange={setNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
          />
        );
      case 3:
        return (
          <ActionCardHome
            onBreadcrumbChange={setNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
          />
        );
      case 4:
        return (
          <TabBarHome
            onBreadcrumbChange={setNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
          />
        );
      case 5:
        return (
          <DialogHome
            onBreadcrumbChange={setNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
          />
        );
      case 6:
        return (
          <PopupHome
            onBreadcrumbChange={setNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
          />
        );
      case 7:
        return (
          <DrawerHome
            onBreadcrumbChange={setNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
          />
        );
      case 8:
        return (
          <ConveyorBeltHome
            onBreadcrumbChange={setNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
          />
        );
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setNestedBreadcrumbItems(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<NavLayoutComponent["id"]>);
  }, []);

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as NavLayoutComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<NavLayoutComponent["id"]>;
      setSelectedItems(selection);
      setNestedBreadcrumbItems(null);

      const selectedComponent = navLayoutComponents.find(
        (component) => component.id === selectedKey,
      );
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));
    }
  };

  const activeComponent = navLayoutComponents.find(
    (component) => component.id === activeComponentId,
  );
  const breadcrumbItems =
    nestedBreadcrumbItems ??
    [
      {
        label: "Navigation and Layouts",
        onSelect: handleHomeNavigation,
      },
      {
        label: activeComponent
          ? formatCorePackLabel(
              activeComponent.name,
              activeComponent.isCorePack,
            )
          : "Component",
        current: true,
      },
    ];

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
          <CatalogBreadcrumb
            items={breadcrumbItems}
            ariaLabel="Navigation and layouts breadcrumb"
          />
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
