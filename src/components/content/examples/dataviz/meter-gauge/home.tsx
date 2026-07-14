import "ojs/ojactioncard";
import { KeySet,KeySetImpl } from "ojs/ojkeyset";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useEffect,useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import {
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../../shared/catalog-breadcrumb";
import { useExampleRoute } from "../../example-route-context";
import MeterBarRecipePage from "../meter-bar/index";
import MeterCircleRecipePage from "../meter-circle/index";
import StatusMeterGaugeRecipePage from "../status-meter-gauge/index";

type MeterGaugeComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isCorePack?: boolean;
};

const meterGaugeComponents: MeterGaugeComponent[] = [
  {
    id: 1,
    routeId: "meter-bar",
    name: "Meter Bar",
    image: "oj-ux-icon-size-12x  oj-ux-ico-linear-status",
    isCorePack: true,
  },
  {
    id: 2,
    routeId: "meter-circle",
    name: "Meter Circle",
    image: "oj-ux-icon-size-12x  oj-ux-ico-chart-gauge",
    isCorePack: true,
  },
  {
    id: 3,
    routeId: "status-meter-gauge",
    name: "Status Meter Gauge",
    image: "oj-ux-icon-size-12x  oj-ux-ico-linear-status",
  },
];

const dataProvider = new MutableArrayDataProvider<
  MeterGaugeComponent["id"],
  MeterGaugeComponent
>(meterGaugeComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<MeterGaugeComponent["id"]>;

const MeterGaugeHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<MeterGaugeComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const activeComponent = meterGaugeComponents.find(
    (component) => component.id === activeComponentId,
  );
  const activeRouteComponent =
    meterGaugeComponents.find(
      (component) => component.routeId === exampleRoute.segments[1],
    ) ??
    (exampleRoute.segments[1] &&
    ["overview", "customization", "center-content", "sizing", "events"].includes(
      exampleRoute.segments[1],
    )
      ? meterGaugeComponents.find(
          (component) => component.routeId === "meter-circle",
        )
      : undefined);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        MeterGaugeComponent["id"],
        MeterGaugeComponent
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
        return <MeterBarRecipePage />;
      case 2:
        return <MeterCircleRecipePage />;
      case 3:
        return <StatusMeterGaugeRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: DatavizListSelectionChangedEvent<MeterGaugeComponent["id"], KeySet<MeterGaugeComponent["id"]>>) => {
    const selectedKey = event.detail.items?.[0]?.key as MeterGaugeComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = meterGaugeComponents.find(
        (component) => component.id === selectedKey,
      );

      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<MeterGaugeComponent["id"]>;
      setSelectedItems(selection);

      if (selectedComponent) {
        exampleRoute.routeTo(["meters", selectedComponent.routeId]);
      }
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<MeterGaugeComponent["id"]>);
    onBreadcrumbChange?.(null);
    exampleRoute.routeTo(["meters"]);
  }, [exampleRoute, onBreadcrumbChange]);

  useEffect(() => {
    if (activeRouteComponent) {
      setActiveComponentId(activeRouteComponent.id);
      setShowComponentDetail(true);
      setSelectedItems(
        new KeySetImpl([activeRouteComponent.id]) as KeySet<
          MeterGaugeComponent["id"]
        >,
      );
      return;
    }

    if (exampleRoute.segments.length === 1) {
      setShowComponentDetail(false);
      setActiveComponentId(null);
      setSelectedItems(new KeySetImpl([]) as KeySet<MeterGaugeComponent["id"]>);
    }
  }, [activeRouteComponent, exampleRoute.segments.length]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Data Visualization", onSelect: onNavigateRootHome },
      { label: "Meters and Gauges", onSelect: handleBack },
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

export default MeterGaugeHome;
