import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import TableHome from "./table/home";
import ListViewHome from "./list-view/index";
import ListItemLayoutHome from "./list-item-layout/home";
import TreeViewRecipePage from "./tree-view/index";
import DataGridRecipePage from "./data-grid/index";
import IndexerRecipePage from "./indexer/index";
import RefresherTouchRecipePage from "./refresher-touch/index";
import StreamListRecipePage from "./stream-list/index";
import CardViewRecipePage from "./card-view/index";
import WaterfallLayoutRecipePage from "./waterfall-layout/index";
import SwipeActionsRecipePage from "./swipe-actions/index";
import GroupByTable from "./group-by-table";
import { RowExpanderTable } from "./rowexpander-table";
import {
  CatalogBreadcrumb,
  type CatalogBreadcrumbItem,
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../shared/catalog-breadcrumb";

type CollectionComponent = {
  id: number;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
  render?: (props?: NestedCatalogHomeProps) => h.JSX.Element | null;
};

const collectionComponents: CollectionComponent[] = [
  {
    id: 9,
    name: "Card View",
    image: "oj-ux-icon-size-12x  oj-ux-ico-cards",
    isAvailable: true,
    isCorePack: true,
    render: () => <CardViewRecipePage />,
  },
  {
    id: 4,
    name: "Data Grid",
    image: "oj-ux-icon-size-12x  oj-ux-ico-cards",
    isAvailable: true,
  },
  {
    id: 11,
    name: "Indexer",
    image: "oj-ux-icon-size-12x oj-ux-ico-indexer",
    isAvailable: true,
    render: () => <IndexerRecipePage />,
  },
  
  {
    id: 10,
    name: "List Item Layout",
    image: "oj-ux-icon-size-12x oj-ux-ico-list",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <ListItemLayoutHome {...props} />,
  },
  {
    id: 2,
    name: "List View",
    image: "oj-ux-icon-size-12x  oj-ux-ico-list",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <ListViewHome {...props} />,
  },
   {
    id: 12,
    name: "Refresher (Touch)",
    image: "oj-ux-icon-size-12x oj-ux-ico-refresher",
    isAvailable: true,
    render: () => <RefresherTouchRecipePage />,
  },
  {
    id: 6,
    name: "Row Expander Table",
    image: "oj-ux-icon-size-12x  oj-ux-ico-row-expander",
    isAvailable: true,
  },
   {
    id: 13,
    name: "Stream List",
    image: "oj-ux-icon-size-12x oj-ux-ico-list",
    isAvailable: true,
    render: () => <StreamListRecipePage />,
  },
  {
    id: 15,
    name: "Swipe Actions (Touch)",
    image: "oj-ux-icon-size-12x  oj-ux-ico-swipe-to-reveal",
    isAvailable: true,
    render: () => <SwipeActionsRecipePage />,
  },
  {
    id: 7,
    name: "Table",
    image: "oj-ux-icon-size-12x  oj-ux-ico-tables-basic",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <TableHome {...props} />,
  },
  {
    id: 3,
    name: "Tree View",
    image: "oj-ux-icon-size-12x  oj-ux-ico-tree-view",
    isAvailable: true,
    render: () => <TreeViewRecipePage />,
  },
  {
    id: 14,
    name: "Waterfall Layout",
    image: "oj-ux-icon-size-12x  oj-ux-ico-cards",
    isAvailable: true,
    render: () => <WaterfallLayoutRecipePage />,
  },
  {
    id: 5,
    name: "Group By Table",
    image: "oj-ux-icon-size-12x oj-ux-ico-group",
    isAvailable: true,
  }
];

const dataProvider = new MutableArrayDataProvider<
  CollectionComponent["id"],
  CollectionComponent
>(collectionComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<CollectionComponent["id"]>;

const CollectionHome = () => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<CollectionComponent["id"]>>(INITIAL_SELECTION);
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
        CollectionComponent["id"],
        CollectionComponent
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
                  <div
                    className={item.data.image}
                    style={{ fontWeight: 400 }}
                  ></div>
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
    const activeComponent = collectionComponents.find(
      (component) => component.id === activeComponentId,
    );

    if (activeComponent?.render) {
      return activeComponent.render({
        onBreadcrumbChange: setNestedBreadcrumbItems,
        onNavigateRootHome: handleHomeNavigation,
      });
    }

    switch (activeComponentId) {
      case 4:
        return <DataGridRecipePage />;
      case 5:
        return <GroupByTable />;
      case 6:
        return <RowExpanderTable />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setNestedBreadcrumbItems(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<CollectionComponent["id"]>);
  }, []);

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as CollectionComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      setNestedBreadcrumbItems(null);
      const selection = event.detail.value as KeySet<CollectionComponent["id"]>;
      setSelectedItems(selection);

      const selectedComponent = collectionComponents.find(
        (component) => component.id === selectedKey,
      );
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));
    }
  };

  const activeComponent = collectionComponents.find(
    (component) => component.id === activeComponentId,
  );
  const breadcrumbItems: CatalogBreadcrumbItem[] = nestedBreadcrumbItems ?? [
    { label: "Collections", onSelect: handleHomeNavigation },
    {
      label: activeComponent
        ? formatCorePackLabel(activeComponent.name, activeComponent.isCorePack)
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
            ariaLabel="Collection breadcrumb"
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

export default CollectionHome;
