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
import AreaChartsHome from "./area-charts/home";
import BarChartsRecipePage from "./bar-charts/index";
import BoxPlotChartsRecipePage from "./box-plot-charts/index";
import BubbleChartsRecipePage from "./bubble-charts/index";
import CombinationChartsRecipePage from "./combination-charts/index";
import FunnelChartsRecipePage from "./funnel-charts/index";
import LineWithAreaChartsRecipePage from "./line-with-area-charts/index";
import PieChartsRecipePage from "./pie-charts/index";
import PolarChartsRecipePage from "./polar-charts/index";
import PyramidChartsRecipePage from "./pyramid-charts/index";
import RangeChartsRecipePage from "./range-charts/index";
import ScatterChartsRecipePage from "./scatter-charts/index";

type ChartComponent = {
  id: number;
  name: string;
  image: string;
  isCorePack?: boolean;
  render: (props?: NestedCatalogHomeProps) => h.JSX.Element | null;
};

const chartComponents: ChartComponent[] = [
  {
    id: 1,
    name: "Area Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-area",
    isCorePack: true,
    render: (props) => <AreaChartsHome {...props} />,
  },
  {
    id: 2,
    name: "Bar Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-bar-chart",
    render: () => <BarChartsRecipePage />,
  },
  {
    id: 3,
    name: "Pie / Donut Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-pie-chart",
    render: () => <PieChartsRecipePage />,
  },
  {
    id: 4,
    name: "Box Plot Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-box-plot",
    render: () => <BoxPlotChartsRecipePage />,
  },
  {
    id: 5,
    name: "Bubble Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-bubble",
    render: () => <BubbleChartsRecipePage />,
  },
  {
    id: 6,
    name: "Polar Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-radar",
    render: () => <PolarChartsRecipePage />,
  },
  {
    id: 7,
    name: "Pyramid Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-pyramid",
    render: () => <PyramidChartsRecipePage />,
  },
  {
    id: 8,
    name: "Range Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-range-area",
    render: () => <RangeChartsRecipePage />,
  },
  {
    id: 9,
    name: "Scatter Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-scatter",
    render: () => <ScatterChartsRecipePage />,
  },
  {
    id: 10,
    name: "Funnel Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-funnel",
    render: () => <FunnelChartsRecipePage />,
  },
  {
    id: 11,
    name: "Line with Area Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-area",
    render: () => <LineWithAreaChartsRecipePage />,
  },
  {
    id: 12,
    name: "Combination Charts",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-combo",
    render: () => <CombinationChartsRecipePage />,
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
  const [selectedItems, setSelectedItems] =
    useState<KeySet<ChartComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const activeComponent = chartComponents.find(
    (component) => component.id === activeComponentId,
  );

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<ChartComponent["id"]>);
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

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

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as ChartComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<ChartComponent["id"]>;
      setSelectedItems(selection);
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

export default ChartsHome;
