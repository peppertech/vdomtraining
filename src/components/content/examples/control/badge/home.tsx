import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import "css!./badge-demo-spacing.css";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import BadgeLegacyRecipePage from "./badge-legacy/index";
import BadgeCorePackRecipePage from "./badge-corepack/index";
import TruncatingBadgeCorePackRecipePage from "./truncating-badge-corepack/index";
import {
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../../shared/catalog-breadcrumb";

type BadgeComponent = {
  id: number;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
};

const badgeComponents: BadgeComponent[] = [
  {
    id: 1,
    name: "Badge",
    description: "Classic oj-badge demos covering colors, sizes, custom styling, and end badges.",
    image: "oj-ux-icon-size-12x oj-ux-ico-badge",
  },
  {
    id: 2,
    name: "Badge (oj-c)",
    description: "Core Pack badge demos covering variants, subtle colors, and sizes.",
    image: "oj-ux-icon-size-12x oj-ux-ico-badge",
    isCorePack: true,
  },
  {
    id: 3,
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
}: NestedCatalogHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<BadgeComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);
  const activeComponent = badgeComponents.find(
    (component) => component.id === activeComponentId,
  );

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
    const selectedKey = event.detail.items[0]?.key as BadgeComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<BadgeComponent["id"]>;
      setSelectedItems(selection);
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<BadgeComponent["id"]>);
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

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

export default BadgeHome;
