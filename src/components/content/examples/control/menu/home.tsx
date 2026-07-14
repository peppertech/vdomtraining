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
  formatCorePackLabel,
} from "../../../../shared/catalog-breadcrumb";
import { useExampleRoute } from "../../example-route-context";
import CorePackMenuButton from "./corePackMenuButton";
import CorePackSplitMenuButton from "./corePackSplitMenuButton";
import MenuLegacyRecipePage from "./menu-legacy/index";
import MenuSelectManyRecipePage from "./menu-select-many/index";
import MenuButton from "./menuButton";

interface MenuComponent {
  id: number;
  routeId: string;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
}

const menuComponents: MenuComponent[] = [
  {
    id: 1,
    routeId: "menu",
    name: "Menu",
    description: "Classic oj-menu demos with popup actions, APIs, and template rendering.",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-modal",
  },
  // {
  //   id: 2,
  //   name: "Menu Button",
  //   description: "Focused oj-menu-button demo including icon, submenu, and disabled scenarios.",
  //   image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
  // },
  //  {
  //   id: 4,
  //   name: "Menu Button",
  //   description: "Core Pack menu button with selection writeback and chroming variants.",
  //   image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
  //   isCorePack: true,
  // },
  {
    id: 3,
    routeId: "menu-select-many",
    name: "Menu Select Many",
    description: "oj-menu-select-many embedded in an oj-menu for multi-select settings.",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-select-many",
  },
  // {
  //   id: 5,
  //   name: "Split Menu Button",
  //   description: "Core Pack split menu button illustrating primary vs menu actions.",
  //   image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
  //   isCorePack: true,
  // },
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
    ) ??
    (exampleRoute.segments.length > routeBase.length
      ? menuComponents.find(
          (component) =>
            "isCorePack" in component && Boolean(component.isCorePack),
        ) ?? menuComponents[0]
      : undefined);

  const renderListItem = useCallback(
    (item: ojListView.ItemTemplateContext<MenuComponent["id"], MenuComponent>) => (
      <li>
        <oj-action-card>
          <div class="component-item" key={item.data.id}>
            <div class="componentImage">
              {item.data.isCorePack ? (
                <span class="demo-badge-position oj-sm-margin-2x-vertical oj-badge oj-badge-end oj-badge-success oj-badge-sm">
                  Core Pack
                </span>
              ) : null}
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
      case 2:
        return <MenuButton />;
      case 3:
        return <MenuSelectManyRecipePage />;
      case 4:
        return <CorePackMenuButton />;
      case 5:
        return <CorePackSplitMenuButton />;
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
      { label: "Menu & Menu Button", onSelect: handleBack },
      {
        label: formatCorePackLabel(
          activeComponent.name,
          activeComponent.isCorePack,
        ),
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
