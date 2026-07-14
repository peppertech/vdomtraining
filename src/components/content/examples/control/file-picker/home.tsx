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
import FilePickerCorePackRecipePage from "./file-picker-corepack/index";
import FilePickerLegacyRecipePage from "./file-picker-legacy/index";

type FilePickerComponent = {
  id: number;
  routeId: string;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
};

const filePickerComponents: FilePickerComponent[] = [
  {
    id: 1,
    routeId: "file-picker-legacy",
    name: "File Picker",
    description:
      "Classic oj-file-picker demos covering selection, capture, custom content, and sizing.",
    image: "oj-ux-icon-size-12x oj-ux-ico-upload",
  },
  {
    id: 2,
    routeId: "file-picker-corepack",
    name: "File Picker",
    description:
      "Core Pack file picker demos covering capture, custom content, custom text, and restrictions.",
    image: "oj-ux-icon-size-12x oj-ux-ico-upload",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  FilePickerComponent["id"],
  FilePickerComponent
>(filePickerComponents, {
  keyAttributes: "id",
});

const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<FilePickerComponent["id"]>;

type ListViewProps = ComponentProps<"oj-list-view">;
type FilePickerSelectedChangedEvent = ojListView.selectedChanged<
  FilePickerComponent["id"],
  FilePickerComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };

const FilePickerHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
  routeSegments,
}: NestedCatalogHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<FilePickerComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);
  const activeComponent = filePickerComponents.find(
    (component) => component.id === activeComponentId,
  );
  const routeBase = routeSegments ?? exampleRoute.segments.slice(0, 1);
  const activeRouteComponent =
    filePickerComponents.find(
      (component) => component.routeId === exampleRoute.segments[routeBase.length],
    ) ??
    (exampleRoute.segments.length > routeBase.length
      ? filePickerComponents.find(
          (component) =>
            "isCorePack" in component && Boolean(component.isCorePack),
        ) ?? filePickerComponents[0]
      : undefined);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        FilePickerComponent["id"],
        FilePickerComponent
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
        return <FilePickerLegacyRecipePage />;
      case 2:
        return <FilePickerCorePackRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: FilePickerSelectedChangedEvent) => {
    const selectedKey = event.detail.items?.[0]?.key as FilePickerComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = filePickerComponents.find(
        (component) => component.id === selectedKey,
      );
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<FilePickerComponent["id"]>;
      setSelectedItems(selection);

      if (selectedComponent) {
        exampleRoute.routeTo([...routeBase, selectedComponent.routeId]);
      }
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<FilePickerComponent["id"]>);
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
      { label: "File Picker", onSelect: handleBack },
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

export default FilePickerHome;
