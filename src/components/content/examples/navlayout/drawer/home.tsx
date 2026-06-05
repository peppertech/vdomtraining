import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import DrawerLayoutLegacyRecipePage from "./drawer-layout-legacy/index";
import DrawerLayoutCorePackRecipePage from "./drawer-layout-corepack/index";
import DrawerPopupLegacyRecipePage from "./drawer-popup-legacy/index";
import DrawerPopupCorePackRecipePage from "./drawer-popup-corepack/index";

import {
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../../shared/catalog-breadcrumb";

type DrawerComponent = {
  id: number;
  name: string;
  image: string;
  isCorePack?: boolean;
};

const drawerComponents: DrawerComponent[] = [
  {
    id: 1,
    name: "Drawer Layout",
    image: "oj-ux-icon-size-12x oj-ux-ico-drawer",
  },
  {
    id: 2,
    name: "Drawer Layout",
    image: "oj-ux-icon-size-12x oj-ux-ico-drawer",
    isCorePack: true,
  },
  {
    id: 3,
    name: "Drawer Popup",
    image: "oj-ux-icon-size-12x oj-ux-ico-drawer-popup",
  },
  {
    id: 4,
    name: "Drawer Popup",
    image: "oj-ux-icon-size-12x oj-ux-ico-drawer-popup",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  DrawerComponent["id"],
  DrawerComponent
>(drawerComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<DrawerComponent["id"]>;

const DrawerHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<DrawerComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const activeComponent = drawerComponents.find(
    (component) => component.id === activeComponentId,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        DrawerComponent["id"],
        DrawerComponent
      >,
    ) => (
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
    ),
    [selectedItems],
  );

  const ComponentDetail = useCallback(() => {
    switch (activeComponentId) {
      case 1:
        return <DrawerLayoutLegacyRecipePage />;
      case 2:
        return <DrawerLayoutCorePackRecipePage />;
      case 3:
        return <DrawerPopupLegacyRecipePage />;
      case 4:
        return <DrawerPopupCorePackRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(new KeySetImpl([]) as KeySet<DrawerComponent["id"]>);
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as DrawerComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<DrawerComponent["id"]>;
      setSelectedItems(selection);
    }
  };

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Layout & Nav", onSelect: onNavigateRootHome },
      { label: "Drawer", onSelect: handleHomeNavigation },
      {
        label: formatCorePackLabel(
          activeComponent.name,
          activeComponent.isCorePack,
        ),
        current: true,
      },
    ]);

    return () => onBreadcrumbChange(null);
  }, [
    activeComponent,
    handleHomeNavigation,
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

export default DrawerHome;
