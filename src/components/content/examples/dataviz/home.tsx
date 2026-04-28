import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import Chart from "./charts/chart";
import { DrillChart } from "./charts/chart-drill";
import AreaChartsHome from "./charts/area-charts/home";
import BarChartsRecipePage from "./charts/bar-charts/index";
import BoxPlotChartsRecipePage from "./charts/box-plot-charts/index";
import BubbleChartsRecipePage from "./charts/bubble-charts/index";
import CombinationChartsRecipePage from "./charts/combination-charts/index";
import DiagramRecipePage from "./diagram/index";
import FunnelChartsRecipePage from "./charts/funnel-charts/index";
import GanttRecipePage from "./gantt/index";
import LegendHome from "./legend/home";
import LineWithAreaChartsRecipePage from "./charts/line-with-area-charts/index";
import MeterGaugeHome from "./meter-gauge/home";
import NBoxRecipePage from "./nbox/index";
import PieChartsRecipePage from "./charts/pie-charts/index";
import PolarChartsRecipePage from "./charts/polar-charts/index";
import PyramidChartsRecipePage from "./charts/pyramid-charts/index";
import RangeChartsRecipePage from "./charts/range-charts/index";
import RatingGaugeHome from "./rating-gauge/home";
import ScatterChartsRecipePage from "./charts/scatter-charts/index";
import SunburstRecipePage from "./sunburst/index";
import TagCloudHome from "./tag-cloud/home";
import ThematicMapRecipePage from "./thematic-map/index";
import {
  CatalogBreadcrumb,
  type CatalogBreadcrumbItem,
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../shared/catalog-breadcrumb";

type DataVizComponent = {
  id: number;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
  render?: (props?: NestedCatalogHomeProps) => h.JSX.Element | null;
};

const dataVizComponents: DataVizComponent[] = [
  {
    id: 1,
    name: "Area Charts",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-area",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <AreaChartsHome {...props} />,
  },
  {
    id: 2,
    name: "Bar Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-bar-chart",
    isAvailable: true,
  },
  {
    id: 9,
    name: "Box Plot Charts",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-box-plot",
    isAvailable: true,
  },
  {
    id: 10,
    name: "Bubble Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-bubble",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Pie / Donut Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-pie-chart",
    isAvailable: true,
  },
  {
    id: 11,
    name: "Polar Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-radar",
    isAvailable: true,
  },
  {
    id: 12,
    name: "Pyramid Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-pyramid",
    isAvailable: true,
  },
  {
    id: 13,
    name: "Range Charts",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-range-area",
    isAvailable: true,
  },
  {
    id: 14,
    name: "Scatter Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-scatter",
    isAvailable: true,
  },
  {
    id: 15,
    name: "Funnel Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-funnel",
    isAvailable: true,
  },
  {
    id: 16,
    name: "Line with Area Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-area",
    isAvailable: true,
  },
  {
    id: 17,
    name: "Combination Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-combo",
    isAvailable: true,
  },
  {
    id: 18,
    name: "Gantt",
    image: "oj-ux-icon-size-12x oj-ux-ico-timeline",
    isAvailable: true,
  },
  {
    id: 19,
    name: "NBox",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-nbox",
    isAvailable: true,
  },
  {
    id: 20,
    name: "Meters and Gauges",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-gauge",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <MeterGaugeHome {...props} />,
  },
  {
    id: 23,
    name: "Rating Gauge",
    image: "oj-ux-icon-size-12x oj-ux-ico-star",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <RatingGaugeHome {...props} />,
  },
  {
    id: 24,
    name: "Sunburst",
    image: "oj-ux-icon-size-12x  oj-ux-ico-sunburst",
    isAvailable: true,
  },
  {
    id: 25,
    name: "Tag Cloud",
    image: "oj-ux-icon-size-12x oj-ux-ico-cloud",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <TagCloudHome {...props} />,
  },
  {
    id: 26,
    name: "Thematic Map",
    image: "oj-ux-icon-size-12x oj-ux-ico-map",
    isAvailable: true,
  },
  {
    id: 4,
    name: "Legend",
    image: "oj-ux-icon-size-12x  oj-ux-ico-legend",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <LegendHome {...props} />,
  },
  
  {
    id: 8,
    name: "Diagram",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-radar",
    isAvailable: true,
  },
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
  }, []);

  const ComponentDetail = useCallback(() => {
    const activeComponent = dataVizComponents.find(
      (component) => component.id === activeComponentId,
    );
    if (activeComponent?.render) {
      return activeComponent.render({
        onBreadcrumbChange: setNestedBreadcrumbItems,
        onNavigateRootHome: handleHomeNavigation,
      });
    }

    switch (activeComponentId) {
      case 2:
        return <BarChartsRecipePage />;
      case 9:
        return <BoxPlotChartsRecipePage />;
      case 10:
        return <BubbleChartsRecipePage />;
      case 3:
        return <PieChartsRecipePage />;
      case 11:
        return <PolarChartsRecipePage />;
      case 12:
        return <PyramidChartsRecipePage />;
      case 13:
        return <RangeChartsRecipePage />;
      case 14:
        return <ScatterChartsRecipePage />;
      case 15:
        return <FunnelChartsRecipePage />;
      case 16:
        return <LineWithAreaChartsRecipePage />;
      case 17:
        return <CombinationChartsRecipePage />;
      case 18:
        return <GanttRecipePage />;
      case 19:
        return <NBoxRecipePage />;
      case 24:
        return <SunburstRecipePage />;
      case 26:
        return <ThematicMapRecipePage />;
      case 5:
        return <Chart />;
      case 6:
        return <DrillChart />;
      case 8:
        return <DiagramRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId, handleHomeNavigation]);

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as DataVizComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      setNestedBreadcrumbItems(null);
      const selection = event.detail.value as KeySet<DataVizComponent["id"]>;
      setSelectedItems(selection);

      const selectedComponent = dataVizComponents.find(
        (component) => component.id === selectedKey,
      );
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));
    }
  };

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
