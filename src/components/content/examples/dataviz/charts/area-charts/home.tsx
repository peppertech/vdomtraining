import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import {
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../../../shared/catalog-breadcrumb";
import { useExampleRoute } from "../../../example-route-context";
import AreaChartCorePackRecipePage from "./areaChartCorePack/index";
import AreaChartLegacyRecipePage from "./areaChartLegacy/index";

type AreaChartComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isCorePack?: boolean;
};

const areaChartComponents: AreaChartComponent[] = [
  {
    id: 1,
    routeId: "area-chart",
    name: "Area Chart",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-area",
  },
  {
    id: 2,
    routeId: "area-chart-core-pack",
    name: "Area Chart",
    image: "oj-ux-icon-size-12x oj-ux-ico-chart-area",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  AreaChartComponent["id"],
  AreaChartComponent
>(areaChartComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<AreaChartComponent["id"]>;

const AreaChartsHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<AreaChartComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const activeComponent = areaChartComponents.find(
    (component) => component.id === activeComponentId,
  );
  const activeRouteComponent = areaChartComponents.find(
    (component) => component.routeId === exampleRoute.segments[2],
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        AreaChartComponent["id"],
        AreaChartComponent
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
        return <AreaChartLegacyRecipePage />;
      case 2:
        return <AreaChartCorePackRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: DatavizListSelectionChangedEvent<AreaChartComponent["id"], KeySet<AreaChartComponent["id"]>>) => {
    const selectedKey = event.detail.items?.[0]?.key as AreaChartComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = areaChartComponents.find(
        (component) => component.id === selectedKey,
      );

      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<AreaChartComponent["id"]>;
      setSelectedItems(selection);

      if (selectedComponent) {
        exampleRoute.routeTo([
          "charts",
          "area-charts",
          selectedComponent.routeId,
        ]);
      }
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<AreaChartComponent["id"]>,
    );
    onBreadcrumbChange?.(null);
    exampleRoute.routeTo(["charts", "area-charts"]);
  }, [exampleRoute, onBreadcrumbChange]);

  useEffect(() => {
    if (activeRouteComponent) {
      setActiveComponentId(activeRouteComponent.id);
      setShowComponentDetail(true);
      setSelectedItems(
        new KeySetImpl([activeRouteComponent.id]) as KeySet<
          AreaChartComponent["id"]
        >,
      );
      return;
    }

    if (exampleRoute.segments.length === 2) {
      setShowComponentDetail(false);
      setActiveComponentId(null);
      setSelectedItems(
        new KeySetImpl([]) as KeySet<AreaChartComponent["id"]>,
      );
    }
  }, [activeRouteComponent, exampleRoute.segments.length]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Data Visualization", onSelect: onNavigateRootHome },
      { label: "Area Charts", onSelect: handleBack },
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

export default AreaChartsHome;
