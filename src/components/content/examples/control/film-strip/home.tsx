import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import FilmStripLegacyRecipePage from "./film-strip-legacy/index";
import {
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../../shared/catalog-breadcrumb";

type FilmStripComponent = {
  id: number;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
};

const filmStripComponents: FilmStripComponent[] = [
  {
    id: 1,
    name: "Film Strip",
    description:
      "Classic oj-film-strip demos covering navigation, paging, lazy rendering, and layouts.",
    image: "oj-ux-icon-size-12x oj-ux-ico-film",
  },
];

const dataProvider = new MutableArrayDataProvider<
  FilmStripComponent["id"],
  FilmStripComponent
>(filmStripComponents, {
  keyAttributes: "id",
});

const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<FilmStripComponent["id"]>;

type ListViewProps = ComponentProps<"oj-list-view">;
type FilmStripSelectedChangedEvent = ojListView.selectedChanged<
  FilmStripComponent["id"],
  FilmStripComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };

const FilmStripHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<FilmStripComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);
  const activeComponent = filmStripComponents.find(
    (component) => component.id === activeComponentId,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        FilmStripComponent["id"],
        FilmStripComponent
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
        return <FilmStripLegacyRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: FilmStripSelectedChangedEvent) => {
    const selectedKey = event.detail.items[0]?.key as FilmStripComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<FilmStripComponent["id"]>;
      setSelectedItems(selection);
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<FilmStripComponent["id"]>);
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Controls", onSelect: onNavigateRootHome },
      { label: "Film Strip", onSelect: handleBack },
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

export default FilmStripHome;
