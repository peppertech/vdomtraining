import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import ListItemLayoutDemo from "./list-item-layout";
import CorePackListItemLayoutDemo from "./core-pack.list-item-layout";
import {
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../../shared/catalog-breadcrumb";

type ListItemLayoutComponent = {
  id: number;
  name: string;
  image: string;
  isCorePack?: boolean;
};

const listItemLayoutComponents: ListItemLayoutComponent[] = [
  {
    id: 1,
    name: "List Item Layout",
    image: "oj-ux-icon-size-12x oj-ux-ico-list",
  },
  {
    id: 2,
    name: "List Item Layout",
    image: "oj-ux-icon-size-12x oj-ux-ico-list",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  ListItemLayoutComponent["id"],
  ListItemLayoutComponent
>(listItemLayoutComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<ListItemLayoutComponent["id"]>;

const ListItemLayoutHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<ListItemLayoutComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const activeComponent = listItemLayoutComponents.find(
    (component) => component.id === activeComponentId,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        ListItemLayoutComponent["id"],
        ListItemLayoutComponent
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
        return <ListItemLayoutDemo />;
      case 2:
        return <CorePackListItemLayoutDemo />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<ListItemLayoutComponent["id"]>,
    );
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

  const handleSelectedChanged = (event: any) => {
    const selectedKey =
      event.detail.items[0]?.key as ListItemLayoutComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection =
        event.detail.value as KeySet<ListItemLayoutComponent["id"]>;
      setSelectedItems(selection);
    }
  };

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Collections", onSelect: onNavigateRootHome },
      { label: "List Item Layout", onSelect: handleBack },
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

export default ListItemLayoutHome;
