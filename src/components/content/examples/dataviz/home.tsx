import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import ChartsHome from "./charts/home";
import DiagramRecipePage from "./diagram/index";
import GanttRecipePage from "./gantt/index";
import LegendHome from "./legend/home";
import MeterGaugeHome from "./meter-gauge/home";
import NBoxRecipePage from "./nbox/index";
import PictoChartHome from "./picto-chart/home";
import RatingGaugeHome from "./rating-gauge/home";
import SunburstRecipePage from "./sunburst/index";
import TagCloudHome from "./tag-cloud/home";
import ThematicMapRecipePage from "./thematic-map/index";
import TimelineRecipePage from "./timeline/index";
import TreemapRecipePage from "./treemap/index";
import {
  CatalogBreadcrumb,
  type CatalogBreadcrumbItem,
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../shared/catalog-breadcrumb";
import { useExampleRoute } from "../example-route-context";

type DataVizComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
  render?: (props?: NestedCatalogHomeProps) => h.JSX.Element | null;
};

const dataVizComponents: DataVizComponent[] = [
  {
    id: 1,
    routeId: "charts",
    name: "Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-combo",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <ChartsHome {...props} />,
  },
  {
    id: 8,
    routeId: "diagram",
    name: "Diagram",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-radar",
    isAvailable: true,
  },
  {
    id: 18,
    routeId: "gantt",
    name: "Gantt",
    image: "oj-ux-icon-size-12x oj-ux-ico-timeline",
    isAvailable: true,
  },
  {
    id: 4,
    routeId: "legend",
    name: "Legend",
    image: "oj-ux-icon-size-12x  oj-ux-ico-legend",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <LegendHome {...props} />,
  },
  {
    id: 20,
    routeId: "meters",
    name: "Meters",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-gauge",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <MeterGaugeHome {...props} />,
  },
  {
    id: 19,
    routeId: "nbox",
    name: "NBox",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-nbox",
    isAvailable: true,
  },
  {
    id: 27,
    routeId: "picto-chart",
    name: "Picto Chart",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-pictochart",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <PictoChartHome {...props} />,
  },

  {
    id: 23,
    routeId: "rating-gauge",
    name: "Rating Gauge",
    image: "oj-ux-icon-size-12x oj-ux-ico-star",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <RatingGaugeHome {...props} />,
  },
  {
    id: 24,
    routeId: "sunburst",
    name: "Sunburst",
    image: "oj-ux-icon-size-12x  oj-ux-ico-sunburst",
    isAvailable: true,
  },
  {
    id: 25,
    routeId: "tag-cloud",
    name: "Tag Cloud",
    image: "oj-ux-icon-size-12x oj-ux-ico-cloud",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <TagCloudHome {...props} />,
  },
  {
    id: 26,
    routeId: "thematic-map",
    name: "Thematic Map",
    image: "oj-ux-icon-size-12x oj-ux-ico-map",
    isAvailable: true,
  },
  {
    id: 28,
    routeId: "timeline",
    name: "Timeline",
    image: "oj-ux-icon-size-12x oj-ux-ico-timeline",
    isAvailable: true,
  },
  {
    id: 29,
    routeId: "treemap",
    name: "Treemap",
    image: "oj-ux-icon-size-12x  oj-ux-ico-treemap",
    isAvailable: true,
  }
];

const dataProvider = new MutableArrayDataProvider<
  DataVizComponent["id"],
  DataVizComponent
>(dataVizComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<DataVizComponent["id"]>;

const DataVizHome = () => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<DataVizComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const [isComponentAvailable, setIsComponentAvailable] = useState(false);
  const [nestedBreadcrumbItems, setNestedBreadcrumbItems] = useState<
    CatalogBreadcrumbItem[] | null
  >(null);
  const activeRouteComponent = dataVizComponents.find(
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
        DataVizComponent["id"],
        DataVizComponent
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

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setNestedBreadcrumbItems(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<DataVizComponent["id"]>);
    exampleRoute.routeTo([]);
  }, [exampleRoute]);

  const ComponentDetail = useCallback(() => {
    const activeComponent = dataVizComponents.find(
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
      case 18:
        return <GanttRecipePage />;
      case 19:
        return <NBoxRecipePage />;
      case 28:
        return <TimelineRecipePage />;
      case 29:
        return <TreemapRecipePage />;
      case 24:
        return <SunburstRecipePage />;
      case 26:
        return <ThematicMapRecipePage />;
      case 8:
        return <DiagramRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId, handleHomeNavigation, updateNestedBreadcrumbItems]);

  const handleSelectedChanged = (event: DatavizListSelectionChangedEvent<DataVizComponent["id"], KeySet<DataVizComponent["id"]>>) => {
    const selectedKey = event.detail.items?.[0]?.key as DataVizComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = dataVizComponents.find(
        (component) => component.id === selectedKey,
      );

      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      setNestedBreadcrumbItems(null);
      const selection = event.detail.value as KeySet<DataVizComponent["id"]>;
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
          DataVizComponent["id"]
        >,
      );
      setIsComponentAvailable(Boolean(activeRouteComponent.isAvailable));
      return;
    }

    if (exampleRoute.segments.length === 0) {
      setActiveComponentId(null);
      setShowComponentDetail(false);
      setNestedBreadcrumbItems(null);
      setSelectedItems(new KeySetImpl([]) as KeySet<DataVizComponent["id"]>);
    }
  }, [activeRouteComponent, exampleRoute.segments.length]);

  const activeComponent = dataVizComponents.find(
    (component) => component.id === activeComponentId,
  );
  const breadcrumbItems: CatalogBreadcrumbItem[] = nestedBreadcrumbItems ?? [
    {
      label: "Data Visualization",
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
            ariaLabel="Data visualization breadcrumb"
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

export default DataVizHome;
