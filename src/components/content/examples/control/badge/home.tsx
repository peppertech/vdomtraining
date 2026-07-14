import "css!./badge-demo-spacing.css";
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
import BadgeCorePackRecipePage from "./badge-corepack/index";
import BadgeLegacyRecipePage from "./badge-legacy/index";
import TruncatingBadgeCorePackRecipePage from "./truncating-badge-corepack/index";

type BadgeComponent = {
  id: number;
  routeId: string;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
};

const badgeComponents: BadgeComponent[] = [
  {
    id: 1,
    routeId: "badge",
    name: "Badge",
    description: "Classic oj-badge demos covering colors, sizes, custom styling, and end badges.",
    image: "oj-ux-icon-size-12x oj-ux-ico-badge",
  },
  {
    id: 2,
    routeId: "badge-corepack",
    name: "Badge (oj-c)",
    description: "Core Pack badge demos covering variants, subtle colors, and sizes.",
    image: "oj-ux-icon-size-12x oj-ux-ico-badge",
    isCorePack: true,
  },
  {
    id: 3,
    routeId: "truncating-badge-corepack",
    name: "Truncating Badge (oj-c)",
    description:
      "Core Pack truncating badge demos covering truncation, tooltips, variants, and sizes.",
    image: "oj-ux-icon-size-12x oj-ux-ico-badge",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  BadgeComponent["id"],
  BadgeComponent
>(badgeComponents, {
  keyAttributes: "id",
});

const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<BadgeComponent["id"]>;

type ListViewProps = ComponentProps<"oj-list-view">;
type BadgeSelectedChangedEvent = ojListView.selectedChanged<
  BadgeComponent["id"],
  BadgeComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };

const BadgeHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
  routeSegments,
}: NestedCatalogHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<BadgeComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);
  const activeComponent = badgeComponents.find(
    (component) => component.id === activeComponentId,
  );
  const routeBase = routeSegments ?? exampleRoute.segments.slice(0, 1);
  const activeRouteComponent =
    badgeComponents.find(
      (component) => component.routeId === exampleRoute.segments[routeBase.length],
    ) ??
    (exampleRoute.segments.length > routeBase.length
      ? badgeComponents.find(
          (component) =>
            "isCorePack" in component && Boolean(component.isCorePack),
        ) ?? badgeComponents[0]
      : undefined);

  const renderListItem = useCallback(
    (item: ojListView.ItemTemplateContext<BadgeComponent["id"], BadgeComponent>) => (
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
    switch (activeComponentId) {
      case 1:
        return <BadgeLegacyRecipePage />;
      case 2:
        return <BadgeCorePackRecipePage />;
      case 3:
        return <TruncatingBadgeCorePackRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: BadgeSelectedChangedEvent) => {
    const selectedKey = event.detail.items?.[0]?.key as BadgeComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = badgeComponents.find(
        (component) => component.id === selectedKey,
      );
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<BadgeComponent["id"]>;
      setSelectedItems(selection);

      if (selectedComponent) {
        exampleRoute.routeTo([...routeBase, selectedComponent.routeId]);
      }
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<BadgeComponent["id"]>);
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
      { label: "Badges", onSelect: handleBack },
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

export default BadgeHome;
