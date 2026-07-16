import "ojs/ojactioncard";
import { KeySet,KeySetImpl } from "ojs/ojkeyset";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useEffect,useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import {
  type NestedCatalogHomeProps,
} from "../../../../shared/catalog-breadcrumb";
import { useExampleRoute } from "../../example-route-context";
import MenuLegacyRecipePage from "./menu-legacy/index";
import MenuSelectManyRecipePage from "./menu-select-many/index";

interface MenuComponent {
  id: number;
  routeId: string;
  name: string;
  image: string;
}

const menuComponents: MenuComponent[] = [
  {
    id: 1,
    routeId: "menu",
    name: "Menu",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-modal",
  },
  {
    id: 3,
    routeId: "menu-select-many",
    name: "Menu Select Many",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-select-many",
  }
];

const dataProvider = new MutableArrayDataProvider<MenuComponent["id"], MenuComponent>(
  menuComponents,
  {
    keyAttributes: "id",
  },
);

const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<MenuComponent["id"]>;

type ListViewProps = ComponentProps<"oj-list-view">;
type MenuSelectedChangedEvent = ojListView.selectedChanged<
  MenuComponent["id"],
  MenuComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };

const MenuHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
  routeSegments,
}: NestedCatalogHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<MenuComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);
  const activeComponent = menuComponents.find(
    (component) => component.id === activeComponentId,
  );
  const routeBase = routeSegments ?? exampleRoute.segments.slice(0, 1);
  const activeRouteComponent =
    menuComponents.find(
      (component) => component.routeId === exampleRoute.segments[routeBase.length],
    );

  const renderListItem = useCallback(
    (item: ojListView.ItemTemplateContext<MenuComponent["id"], MenuComponent>) => (
      <li>
        <oj-action-card>
          <div class="component-item" key={item.data.id}>
            <div class="componentImage">
              <div class="oj-helper-text-align-center" style={{ paddingTop: "25px" }}>
                <div className={item.data.image}></div>
              </div>
              <div class="oj-flex-item oj-text-sm componentInfo oj-typography-body-md oj-typography-bold">
                {item.data.name}
              </div>
              
            </div>
          </div>
        </oj-action-card>
      </li>
    ),
    [selectedItems],
  );

  const ComponentDetail = useCallback(() => {
    switch (activeComponentId) {
      case 1:
        return <MenuLegacyRecipePage />;
      case 3:
        return <MenuSelectManyRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: MenuSelectedChangedEvent) => {
    const selectedKey = event.detail.items?.[0]?.key as MenuComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = menuComponents.find(
        (component) => component.id === selectedKey,
      );
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<MenuComponent["id"]>;
      setSelectedItems(selection);

      if (selectedComponent) {
        exampleRoute.routeTo([...routeBase, selectedComponent.routeId]);
      }
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<MenuComponent["id"]>);
    onBreadcrumbChange?.(null);
    exampleRoute.routeTo(routeBase);
  }, [exampleRoute, onBreadcrumbChange, routeSegments]);

  useEffect(() => {
    if (activeRouteComponent) {
      setActiveComponentId(activeRouteComponent.id);
      setShowComponentDetail(true);
      setSelectedItems(
        new KeySetImpl([activeRouteComponent.id]) as typeof INITIAL_SELECTION,
      );
      return;
    }

    if (exampleRoute.segments.length <= routeBase.length) {
      setShowComponentDetail(false);
      setActiveComponentId(null);
      setSelectedItems(new KeySetImpl([]) as typeof INITIAL_SELECTION);
    }
  }, [activeRouteComponent, exampleRoute.segments.length, routeBase.length]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Controls", onSelect: onNavigateRootHome },
      { label: "Menu", onSelect: handleBack },
      {
        label: activeComponent.name,
        current: true,
      },
    ]);
  }, [
    activeComponent,
    handleBack,
    onBreadcrumbChange,
    onNavigateRootHome,
    showComponentDetail,
  ]);

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
          {ComponentDetail()}
        </div>
      )}
    </div>
  );
};

export default MenuHome;
