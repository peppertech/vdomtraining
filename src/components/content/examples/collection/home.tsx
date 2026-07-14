import "ojs/ojactioncard";
import { KeySet,KeySetImpl } from "ojs/ojkeyset";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import * as preact from 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useEffect,useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import {
  CatalogBreadcrumb,
  type CatalogBreadcrumbItem,
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../shared/catalog-breadcrumb";
import { useExampleRoute } from "../example-route-context";
import CardViewRecipePage from "./card-view/index";
import DataGridRecipePage from "./data-grid/index";
import IndexerRecipePage from "./indexer/index";
import ListItemLayoutHome from "./list-item-layout/home";
import ListViewHome from "./list-view/index";
import RefresherTouchRecipePage from "./refresher-touch/index";
import RowExpanderRecipePage from "./row-expander/index";
import SelectorRecipePage from "./selector/index";
import StreamListRecipePage from "./stream-list/index";
import SwipeActionsRecipePage from "./swipe-actions/index";
import GroupByTable from "./table/group-by-table";
import TableHome from "./table/home";
import TreeViewRecipePage from "./tree-view/index";
import WaterfallLayoutRecipePage from "./waterfall-layout/index";

type CollectionComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
  render?: (props?: NestedCatalogHomeProps) => preact.JSX.Element | null;
};
type CollectionSelectedChangedEvent = ojListView.selectedChanged<
  CollectionComponent["id"],
  CollectionComponent
>;

const collectionComponents: CollectionComponent[] = [
  {
    id: 9,
    routeId: "card-view",
    name: "Card View",
    image: "oj-ux-icon-size-12x  oj-ux-ico-cards",
    isAvailable: true,
    isCorePack: true,
    render: () => <CardViewRecipePage />,
  },
  {
    id: 4,
    routeId: "data-grid",
    name: "Data Grid",
    image: "oj-ux-icon-size-12x  oj-ux-ico-cards",
    isAvailable: true,
  },
  {
    id: 11,
    routeId: "indexer",
    name: "Indexer",
    image: "oj-ux-icon-size-12x oj-ux-ico-indexer",
    isAvailable: true,
    render: () => <IndexerRecipePage />,
  },
  
  {
    id: 10,
    routeId: "list-item-layout",
    name: "List Item Layout",
    image: "oj-ux-icon-size-12x oj-ux-ico-list",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <ListItemLayoutHome {...props} />,
  },
  {
    id: 2,
    routeId: "list-view",
    name: "List View",
    image: "oj-ux-icon-size-12x  oj-ux-ico-list",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <ListViewHome {...props} />,
  },
   {
    id: 12,
    routeId: "refresher-touch",
    name: "Refresher (Touch)",
    image: "oj-ux-icon-size-12x oj-ux-ico-refresher",
    isAvailable: true,
    render: () => <RefresherTouchRecipePage />,
  },
  {
    id: 6,
    routeId: "row-expander",
    name: "Row Expander",
    image: "oj-ux-icon-size-12x  oj-ux-ico-row-expander",
    isAvailable: true,
    render: () => <RowExpanderRecipePage />,
  },
  {
    id: 16,
    routeId: "selector",
    name: "Selector",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    isAvailable: true,
    render: () => <SelectorRecipePage />,
  },
   {
    id: 13,
    routeId: "stream-list",
    name: "Stream List",
    image: "oj-ux-icon-size-12x oj-ux-ico-list",
    isAvailable: true,
    render: () => <StreamListRecipePage />,
  },
  {
    id: 15,
    routeId: "swipe-actions",
    name: "Swipe Actions (Touch)",
    image: "oj-ux-icon-size-12x  oj-ux-ico-swipe-to-reveal",
    isAvailable: true,
    render: () => <SwipeActionsRecipePage />,
  },
  {
    id: 7,
    routeId: "table",
    name: "Table",
    image: "oj-ux-icon-size-12x  oj-ux-ico-tables-basic",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <TableHome {...props} />,
  },
  {
    id: 3,
    routeId: "tree-view",
    name: "Tree View",
    image: "oj-ux-icon-size-12x  oj-ux-ico-tree-view",
    isAvailable: true,
    render: () => <TreeViewRecipePage />,
  },
  {
    id: 14,
    routeId: "waterfall-layout",
    name: "Waterfall Layout",
    image: "oj-ux-icon-size-12x  oj-ux-ico-cards",
    isAvailable: true,
    render: () => <WaterfallLayoutRecipePage />,
  },
  // {
  //   id: 5,
  //   name: "Group By Table",
  //   image: "oj-ux-icon-size-12x oj-ux-ico-group",
  //   isAvailable: true,
  // }
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
  const exampleRoute = useExampleRoute();
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
  const activeRouteComponent = collectionComponents.find(
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
        onBreadcrumbChange: updateNestedBreadcrumbItems,
        onNavigateRootHome: handleHomeNavigation,
        routeSegments: [activeComponent.routeId],
      });
    }

    switch (activeComponentId) {
      case 4:
        return <DataGridRecipePage />;
      case 5:
        return <GroupByTable />;
      default:
        return null;
    }
  }, [activeComponentId, updateNestedBreadcrumbItems]);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setNestedBreadcrumbItems(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<CollectionComponent["id"]>);
    exampleRoute.routeTo([]);
  }, [exampleRoute]);

  const handleSelectedChanged = (event: CollectionSelectedChangedEvent) => {
    const selection = event.detail.value as KeySetImpl<CollectionComponent["id"]>;
    const selectedKey = Array.from(selection.values())[0];
    if (typeof selectedKey === "number") {
      const selectedComponent = collectionComponents.find(
        (component) => component.id === selectedKey,
      );

      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      setNestedBreadcrumbItems(null);
      setSelectedItems(selection);
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
          CollectionComponent["id"]
        >,
      );
      setIsComponentAvailable(Boolean(activeRouteComponent.isAvailable));
      return;
    }

    if (exampleRoute.segments.length === 0) {
      setActiveComponentId(null);
      setShowComponentDetail(false);
      setNestedBreadcrumbItems(null);
      setSelectedItems(new KeySetImpl([]) as KeySet<CollectionComponent["id"]>);
    }
  }, [activeRouteComponent, exampleRoute.segments.length]);

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
