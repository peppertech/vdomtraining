import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import DialogLegacyRecipePage from "./dialog-legacy/index";
import DialogCorePackRecipePage from "./dialog-corepack/index";
import {
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../../shared/catalog-breadcrumb";

type DialogComponent = {
  id: number;
  name: string;
  image: string;
  isCorePack?: boolean;
};

const dialogComponents: DialogComponent[] = [
  {
    id: 1,
    name: "Dialog",
    image: "oj-ux-icon-size-12x oj-ux-ico-dialog",
  },
  {
    id: 2,
    name: "Dialog",
    image: "oj-ux-icon-size-12x oj-ux-ico-dialog",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  DialogComponent["id"],
  DialogComponent
>(dialogComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<DialogComponent["id"]>;

const DialogHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<DialogComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const activeComponent = dialogComponents.find(
    (component) => component.id === activeComponentId,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        DialogComponent["id"],
        DialogComponent
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
        return <DialogLegacyRecipePage />;
      case 2:
        return <DialogCorePackRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(new KeySetImpl([]) as KeySet<DialogComponent["id"]>);
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as DialogComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<DialogComponent["id"]>;
      setSelectedItems(selection);
    }
  };

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Navigation and Layouts", onSelect: onNavigateRootHome },
      { label: "Dialog", onSelect: handleHomeNavigation },
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
    handleHomeNavigation,
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

export default DialogHome;
