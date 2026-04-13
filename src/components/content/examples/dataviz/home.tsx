import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";
import { ButtonElement } from "ojs/ojbutton";

import Chart from "./charts/chart";
import { DrillChart } from "./charts/chart-drill";
import Legend from "./legend";
import { AreaChartVisualization } from "./charts/areaChartVisualization";
import { BarChartLegacyExample } from "./charts/barChartLegacyExample";
import { PieChartLegacyExample } from "./charts/pieChartLegacyExample";
import { LegendCorePackExample } from "./legendCorePackExample";
import { DiagramExample } from "./diagramExample";
import AreaChartDemoWrapper from "./charts/area-chart-default/index";

type DataVizComponent = {
  id: number;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
};

const dataVizComponents: DataVizComponent[] = [
  {
    id: 1,
    name: "Area Chart",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-area",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 2,
    name: "Bar Chart",
    image: "oj-ux-icon-size-12x oj-ux-ico-bar-chart",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Pie / Donut Chart",
    image: "oj-ux-icon-size-12x oj-ux-ico-pie-chart",
    isAvailable: true,
  },
  {
    id: 4,
    name: "Legend",
    image: "oj-ux-icon-size-12x  oj-ux-ico-legend",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 5,
    name: "Basic Chart",
    image: "oj-ux-icon-size-12x oj-ux-ico-bar-chart",
    isAvailable: true,
  },
  {
    id: 6,
    name: "Drillable Chart",
    image: "oj-ux-icon-size-12x oj-ux-ico-dashboard",
    isAvailable: true,
  },
  {
    id: 7,
    name: "Legend",
    image: "oj-ux-icon-size-12x oj-ux-ico-legend",
    isAvailable: true,
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

  const ComponentDetail = useCallback(() => {
    switch (activeComponentId) {
      case 1:
        return <AreaChartDemoWrapper />;
      case 2:
        return <BarChartLegacyExample />;
      case 3:
        return <PieChartLegacyExample />;
      case 4:
        return <LegendCorePackExample />;
      case 5:
        return <Chart />;
      case 6:
        return <DrillChart />;
      case 7:
        return <Legend />;
      case 8:
        return <DiagramExample />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleOjAction = (_event: ButtonElement.ojAction) => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(new KeySetImpl([]) as KeySet<DataVizComponent["id"]>);
  };

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as DataVizComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<DataVizComponent["id"]>;
      setSelectedItems(selection);

      const selectedComponent = dataVizComponents.find(
        (component) => component.id === selectedKey,
      );
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));
    }
  };

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
          <oj-button class="breadcrumb-wrapper" label="  Home " onojAction={handleOjAction} />
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
