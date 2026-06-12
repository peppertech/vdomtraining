import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import {
  type CatalogBreadcrumbItem,
  type NestedCatalogHomeProps,
} from "../../../../shared/catalog-breadcrumb";
import { useExampleRoute } from "../../example-route-context";
import AreaChartsHome from "./area-charts/home";
import BarChartsRecipePage from "./bar-charts/index";
import BoxPlotChartsRecipePage from "./box-plot-charts/index";
import BubbleChartsRecipePage from "./bubble-charts/index";
import CommonChartsLegacyRecipePage from "./common-charts-legacy/index";
import CombinationChartsRecipePage from "./combination-charts/index";
import FunnelChartsRecipePage from "./funnel-charts/index";
import LineChartsCorePackRecipePage from "./line-charts-corepack/index";
import LineChartsRecipePage from "./line-charts/index";
import LineWithAreaChartsRecipePage from "./line-with-area-charts/index";
import PieChartsRecipePage from "./pie-charts/index";
import PolarChartsRecipePage from "./polar-charts/index";
import PyramidChartsRecipePage from "./pyramid-charts/index";
import RangeChartsRecipePage from "./range-charts/index";
import ScatterChartsRecipePage from "./scatter-charts/index";
import SparkChartsRecipePage from "./spark-charts/index";
import StockChartsRecipePage from "./stock-charts/index";

type ChartComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isCorePack?: boolean;
  render: (props?: NestedCatalogHomeProps) => h.JSX.Element | null;
};

const chartComponents: ChartComponent[] = [
  {
    id: 1,
    routeId: "area-charts",
    name: "Area Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-area",
    isCorePack: true,
    render: (props) => <AreaChartsHome {...props} />,
  },
  {
    id: 2,
    routeId: "bar-charts",
    name: "Bar Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-bar-chart",
    render: () => <BarChartsRecipePage />,
  },
  {
    id: 3,
    routeId: "pie-charts",
    name: "Pie / Donut Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-pie-chart",
    render: () => <PieChartsRecipePage />,
  },
  {
    id: 4,
    routeId: "box-plot-charts",
    name: "Box Plot Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-box-plot",
    render: () => <BoxPlotChartsRecipePage />,
  },
  {
    id: 5,
    routeId: "bubble-charts",
    name: "Bubble Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-bubble",
    render: () => <BubbleChartsRecipePage />,
  },
  {
    id: 6,
    routeId: "polar-charts",
    name: "Polar Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-radar",
    render: () => <PolarChartsRecipePage />,
  },
  {
    id: 7,
    routeId: "pyramid-charts",
    name: "Pyramid Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-pyramid",
    render: () => <PyramidChartsRecipePage />,
  },
  {
    id: 8,
    routeId: "range-charts",
    name: "Range Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-range-area",
    render: () => <RangeChartsRecipePage />,
  },
  {
    id: 9,
    routeId: "scatter-charts",
    name: "Scatter Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-scatter",
    render: () => <ScatterChartsRecipePage />,
  },
  {
    id: 10,
    routeId: "funnel-charts",
    name: "Funnel Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-funnel",
    render: () => <FunnelChartsRecipePage />,
  },
  {
    id: 11,
    routeId: "line-with-area-charts",
    name: "Line with Area Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-area",
    render: () => <LineWithAreaChartsRecipePage />,
  },
  {
    id: 12,
    routeId: "combination-charts",
    name: "Combination Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-combo",
    render: () => <CombinationChartsRecipePage />,
  },
  {
    id: 13,
    routeId: "common-charts",
    name: "Common Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-combo",
    render: () => <CommonChartsLegacyRecipePage />,
  },
  {
    id: 14,
    routeId: "line-charts",
    name: "Line Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-line",
    render: () => <LineChartsRecipePage />,
  },
  {
    id: 15,
    routeId: "line-charts-corepack",
    name: "Line Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-line",
    isCorePack: true,
    render: () => <LineChartsCorePackRecipePage />,
  },
  {
    id: 16,
    routeId: "stock-charts",
    name: "Stock Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-combo",
    render: () => <StockChartsRecipePage />,
  },
  {
    id: 17,
    routeId: "spark-charts",
    name: "Spark Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-area",
    render: () => <SparkChartsRecipePage />,
  },
];

const dataProvider = new MutableArrayDataProvider<
  ChartComponent["id"],
  ChartComponent
>(chartComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<ChartComponent["id"]>;

const ChartsHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<ChartComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const activeComponent = chartComponents.find(
    (component) => component.id === activeComponentId,
  );
  const activeRouteComponent = chartComponents.find(
    (component) => component.routeId === exampleRoute.segments[1],
  );

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<ChartComponent["id"]>);
    onBreadcrumbChange?.(null);
    exampleRoute.routeTo(["charts"]);
  }, [exampleRoute, onBreadcrumbChange]);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        ChartComponent["id"],
        ChartComponent
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

  const handleSelectedChanged = (event: DatavizListSelectionChangedEvent<ChartComponent["id"], KeySet<ChartComponent["id"]>>) => {
    const selectedKey = event.detail.items?.[0]?.key as ChartComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = chartComponents.find(
        (component) => component.id === selectedKey,
      );

      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<ChartComponent["id"]>;
      setSelectedItems(selection);

      if (selectedComponent) {
        exampleRoute.routeTo(["charts", selectedComponent.routeId]);
      }
    }
  };

  const handleNestedBreadcrumbChange = useCallback(
    (items: CatalogBreadcrumbItem[] | null) => {
      if (!items) {
        if (activeComponent) {
          onBreadcrumbChange?.([
            { label: "Data Visualization", onSelect: onNavigateRootHome },
            { label: "Charts", onSelect: handleBack },
            {
              label: activeComponent.name,
              current: true,
            },
          ]);
        } else {
          onBreadcrumbChange?.(null);
        }
        return;
      }

      onBreadcrumbChange?.([
        { label: "Data Visualization", onSelect: onNavigateRootHome },
        { label: "Charts", onSelect: handleBack },
        ...items.slice(1),
      ]);
    },
    [activeComponent, handleBack, onBreadcrumbChange, onNavigateRootHome],
  );

  const ComponentDetail = useCallback(() => {
    if (!activeComponent) {
      return null;
    }

    return activeComponent.render({
      onBreadcrumbChange: handleNestedBreadcrumbChange,
      onNavigateRootHome,
    });
  }, [activeComponent, handleNestedBreadcrumbChange, onNavigateRootHome]);

  useEffect(() => {
    if (activeRouteComponent) {
      setActiveComponentId(activeRouteComponent.id);
      setShowComponentDetail(true);
      setSelectedItems(
        new KeySetImpl([activeRouteComponent.id]) as KeySet<
          ChartComponent["id"]
        >,
      );
      return;
    }

    if (exampleRoute.segments.length === 1) {
      setShowComponentDetail(false);
      setActiveComponentId(null);
      setSelectedItems(new KeySetImpl([]) as KeySet<ChartComponent["id"]>);
    }
  }, [activeRouteComponent, exampleRoute.segments.length]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Data Visualization", onSelect: onNavigateRootHome },
      { label: "Charts", onSelect: handleBack },
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

export default ChartsHome;
