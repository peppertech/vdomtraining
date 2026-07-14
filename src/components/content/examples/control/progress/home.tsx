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
import ProgressBarCorePackRecipePage from "./progress-bar-corepack/index";
import ProgressBarLegacyRecipePage from "./progress-bar-legacy/index";
import ProgressButtonCorePackRecipePage from "./progress-button-corepack/index";
import ProgressCircleCorePackRecipePage from "./progress-circle-corepack/index";
import ProgressCircleLegacyRecipePage from "./progress-circle-legacy/index";

type ProgressComponent = {
  id: number;
  routeId: string;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
};

const progressComponents: ProgressComponent[] = [
  {
    id: 4,
    routeId: "progress-bar-legacy",
    name: "Progress Bar",
    description: "",
    image: "oj-ux-icon-size-12x oj-ux-ico-progress-linear",
  },
  {
    id: 1,
    routeId: "progress-bar-corepack",
    name: "Progress Bar",
    description: "",
    image: "oj-ux-icon-size-12x oj-ux-ico-progress-linear",
    isCorePack: true,
  },
  
  {
    id: 3,
    routeId: "progress-button",
    name: "Progress Button",
    description: "",
    image: "oj-ux-icon-size-12x  oj-ux-ico-button",
    isCorePack: true,
  },
  
  {
    id: 5,
    routeId: "progress-circle-legacy",
    name: "Progress Circle",
    description: "",
    image: "oj-ux-icon-size-12x  oj-ux-ico-circular-progress-7",
  },
  {
    id: 2,
    routeId: "progress-circle-corepack",
    name: "Progress Circle",
    description: "",
    image: "oj-ux-icon-size-12x  oj-ux-ico-circular-progress-7",
    isCorePack: true,
  }
];

const dataProvider = new MutableArrayDataProvider<ProgressComponent["id"], ProgressComponent>(progressComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type ProgressSelectedChangedEvent = ojListView.selectedChanged<
  ProgressComponent["id"],
  ProgressComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<ProgressComponent["id"]>;

const ProgressHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
  routeSegments,
}: NestedCatalogHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] = useState<KeySet<ProgressComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);
  const activeComponent = progressComponents.find(
    (component) => component.id === activeComponentId,
  );
  const routeBase = routeSegments ?? exampleRoute.segments.slice(0, 1);
  const activeRouteComponent =
    progressComponents.find(
      (component) => component.routeId === exampleRoute.segments[routeBase.length],
    ) ??
    (exampleRoute.segments.length > routeBase.length
      ? progressComponents.find(
          (component) =>
            "isCorePack" in component && Boolean(component.isCorePack),
        ) ?? progressComponents[0]
      : undefined);

  const renderListItem = useCallback(
    (item: ojListView.ItemTemplateContext<ProgressComponent["id"], ProgressComponent>) => (
      <li>
        <oj-action-card>
          <div class="component-item" key={item.data.id}>
            <div class="componentImage">
              {item.data.isCorePack ? (
                <span class="demo-badge-position oj-sm-margin-2x-vertical oj-badge oj-badge-end oj-badge-success oj-badge-sm">
                  Core Pack
                </span>
              ) : null}
              <div class="oj-helper-text-align-center" style={{ paddingTop: "25px" }}>
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
    const activeComponent = progressComponents.find((component) => component.id === activeComponentId);
    if (!activeComponent) {
      return null;
    }

    let detailContent: preact.ComponentChildren = null;
    switch (activeComponentId) {
      case 1:
        detailContent = <ProgressBarCorePackRecipePage />;
        break;
      case 2:
        detailContent = <ProgressCircleCorePackRecipePage />;
        break;
      case 3:
        detailContent = <ProgressButtonCorePackRecipePage />;
        break;
      case 4:
        detailContent = <ProgressBarLegacyRecipePage />;
        break;
      case 5:
        detailContent = <ProgressCircleLegacyRecipePage />;
        break;
      default:
        detailContent = null;
    }

    return (
      <div class="oj-sm-margin-4x-top">
        <h5 class="oj-typography-subheading-sm oj-sm-margin-0">{activeComponent.name}</h5>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-2x-bottom">
          {activeComponent.description}
        </p>
        {detailContent}
      </div>
    );
  }, [activeComponentId]);

  const handleSelectedChanged = (event: ProgressSelectedChangedEvent) => {
    const selectedKey = event.detail.items[0]?.key as ProgressComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = progressComponents.find(
        (component) => component.id === selectedKey,
      );
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<ProgressComponent["id"]>;
      setSelectedItems(selection);

      if (selectedComponent) {
        exampleRoute.routeTo([...routeBase, selectedComponent.routeId]);
      }
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<ProgressComponent["id"]>);
    onBreadcrumbChange?.(null);
    exampleRoute.routeTo(routeBase);
  }, [exampleRoute, onBreadcrumbChange, routeSegments]);

  useEffect(() => {
    if (activeRouteComponent) {
      setActiveComponentId(activeRouteComponent.id);
      setShowComponentDetail(true);
      setSelectedItems(
        new KeySetImpl([activeRouteComponent.id]) as typeof INITIAL_SELECTION,
      );
      return;
    }

    if (exampleRoute.segments.length <= routeBase.length) {
      setShowComponentDetail(false);
      setActiveComponentId(null);
      setSelectedItems(new KeySetImpl([]) as typeof INITIAL_SELECTION);
    }
  }, [activeRouteComponent, exampleRoute.segments.length, routeBase.length]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Controls", onSelect: onNavigateRootHome },
      { label: "Progress Indicators", onSelect: handleBack },
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

export default ProgressHome;
