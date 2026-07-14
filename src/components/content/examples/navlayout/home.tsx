import "ojs/ojactioncard";
import { KeySet,KeySetImpl } from "ojs/ojkeyset";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useEffect,useState } from "preact/hooks";
import {
  CatalogBreadcrumb,
  type CatalogBreadcrumbItem,
  formatCorePackLabel,
} from "../../../shared/catalog-breadcrumb";
import { useExampleRoute } from "../example-route-context";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import AccordionHome from "./accordion/home";
import ActionCardHome from "./action-card/home";
import CollapsibleHome from "./collapsible/home";
import ConveyorBeltHome from "./conveyor-belt/home";
import DialogHome from "./dialog/home";
import DrawerHome from "./drawer/home";
import NavigationListLegacyRecipePage from "./navigation-list/navigation-list-legacy/index";
import PanelLegacyRecipePage from "./panel/index";
import PopupHome from "./popup/home";
import TabBarHome from "./tabbar/home";

type NavLayoutComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
};

const navLayoutComponents: NavLayoutComponent[] = [
  {
    id: 2,
    routeId: "accordion",
    name: "Accordion",
    image: "oj-ux-icon-size-12x oj-ux-ico-accordion",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 3,
    routeId: "action-card",
    name: "Action Card",
    image: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 9,
    routeId: "collapsible",
    name: "Collapsible",
    image: "oj-ux-icon-size-12x oj-ux-ico-accordion",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 8,
    routeId: "conveyor-belt",
    name: "Conveyor Belt",
    image: "oj-ux-icon-size-12x oj-ux-ico-carousel",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 5,
    routeId: "dialog",
    name: "Dialog",
    image: "oj-ux-icon-size-12x oj-ux-ico-dialog",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 7,
    routeId: "drawer",
    name: "Drawer",
    image: "oj-ux-icon-size-12x oj-ux-ico-drawer",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 1,
    routeId: "navigation-list",
    name: "Navigation List",
    image: "oj-ux-icon-size-12x oj-ux-ico-navigation",
    isAvailable: true,
  },
  {
    id: 10,
    routeId: "panel",
    name: "Panel",
    image: "oj-ux-icon-size-12x oj-ux-ico-cards",
    isAvailable: true,
  },
  {
    id: 6,
    routeId: "popup",
    name: "Popup",
    image: "oj-ux-icon-size-12x  oj-ux-ico-contact-card",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 4,
    routeId: "tab-bar",
    name: "Tab Bar",
    image: "oj-ux-icon-size-12x  oj-ux-ico-tab-bar",
    isAvailable: true,
    isCorePack: true,
  }
  
];

const dataProvider = new MutableArrayDataProvider<
  NavLayoutComponent["id"],
  NavLayoutComponent
>(navLayoutComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type NavLayoutSelectedChangedEvent = ojListView.selectedChanged<
  NavLayoutComponent["id"],
  NavLayoutComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<NavLayoutComponent["id"]>;

const NavLayoutHome = () => {
  const exampleRoute = useExampleRoute();
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
  const activeRouteComponent = navLayoutComponents.find(
    (component) => component.routeId === exampleRoute.segments[0],
  );

  const updateNestedBreadcrumbItems = useCallback((items: CatalogBreadcrumbItem[] | null) => {
    setNestedBreadcrumbItems((current) => {
      if (current === items) {
        return current;
      }

      if (current && items && current.length === items.length) {
        const hasSameItems = current.every(
          (item, index) =>
            item.label === items[index].label &&
            Boolean(item.current) === Boolean(items[index].current),
        );

        if (hasSameItems) {
          return current;
        }
      }

      return items;
    });
  }, []);

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
        return <NavigationListLegacyRecipePage />;
      case 2:
        return (
          <AccordionHome
            onBreadcrumbChange={updateNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
            routeSegments={["accordion"]}
          />
        );
      case 3:
        return (
          <ActionCardHome
            onBreadcrumbChange={updateNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
            routeSegments={["action-card"]}
          />
        );
      case 4:
        return (
          <TabBarHome
            onBreadcrumbChange={updateNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
            routeSegments={["tab-bar"]}
          />
        );
      case 5:
        return (
          <DialogHome
            onBreadcrumbChange={updateNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
            routeSegments={["dialog"]}
          />
        );
      case 6:
        return (
          <PopupHome
            onBreadcrumbChange={updateNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
            routeSegments={["popup"]}
          />
        );
      case 7:
        return (
          <DrawerHome
            onBreadcrumbChange={updateNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
            routeSegments={["drawer"]}
          />
        );
      case 8:
        return (
          <ConveyorBeltHome
            onBreadcrumbChange={updateNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
            routeSegments={["conveyor-belt"]}
          />
        );
      case 9:
        return (
          <CollapsibleHome
            onBreadcrumbChange={updateNestedBreadcrumbItems}
            onNavigateRootHome={handleHomeNavigation}
            routeSegments={["collapsible"]}
          />
        );
      case 10:
        return <PanelLegacyRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId, updateNestedBreadcrumbItems]);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setNestedBreadcrumbItems(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<NavLayoutComponent["id"]>);
    exampleRoute.routeTo([]);
  }, [exampleRoute]);

  const handleSelectedChanged = (event: NavLayoutSelectedChangedEvent) => {
    if (event.detail.updatedFrom && event.detail.updatedFrom !== "internal") {
      return;
    }

    const selectedKey = event.detail.items?.[0]?.key as
      | NavLayoutComponent["id"]
      | undefined;
    if (typeof selectedKey === "number") {
      const selectedComponent = navLayoutComponents.find(
        (component) => component.id === selectedKey,
      );

      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<NavLayoutComponent["id"]>;
      setSelectedItems(selection);
      setNestedBreadcrumbItems(null);
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));

      if (selectedComponent) {
        exampleRoute.routeTo([selectedComponent.routeId]);
      }
    }
  };

  useEffect(() => {
    if (activeRouteComponent) {
      setActiveComponentId(activeRouteComponent.id);
      setShowComponentDetail(true);
      setNestedBreadcrumbItems(null);
      setSelectedItems(
        new KeySetImpl([activeRouteComponent.id]) as KeySet<
          NavLayoutComponent["id"]
        >,
      );
      setIsComponentAvailable(Boolean(activeRouteComponent.isAvailable));
      return;
    }

    if (exampleRoute.segments.length === 0) {
      setActiveComponentId(null);
      setShowComponentDetail(false);
      setNestedBreadcrumbItems(null);
      setSelectedItems(new KeySetImpl([]) as KeySet<NavLayoutComponent["id"]>);
    }
  }, [activeRouteComponent, exampleRoute.segments.length]);

  const activeComponent = navLayoutComponents.find(
    (component) => component.id === activeComponentId,
  );
  const breadcrumbItems =
    nestedBreadcrumbItems ??
    [
      {
        label: "Layout & Nav",
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
