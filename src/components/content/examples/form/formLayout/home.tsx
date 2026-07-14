import "ojs/ojactioncard";
import { KeySet,KeySetImpl } from "ojs/ojkeyset";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useEffect,useState } from "preact/hooks";
import { useExampleRoute } from "../../example-route-context";
import {
  type NestedFormHomeProps,
  formatCorePackLabel,
} from "../form-breadcrumb";
import FormLayoutCorePack from "./formLayoutCorePack/index";
import FormLayoutLegacy from "./formLayoutLegacy/index";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type FormLayoutComponent = {
  id: number;
  routeId: string;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
};

const formLayoutComponents: FormLayoutComponent[] = [
  {
    id: 1,
    routeId: "form-layout-legacy",
    name: "Form Layout",
    description: "Legacy oj-form-layout recipes for spanning, nesting, shared columns, and job forms.",
    image: "oj-ux-icon-size-12x oj-ux-ico-form-layout-jet",
  },
  {
    id: 2,
    routeId: "form-layout-corepack",
    name: "Form Layout",
    description: "Core Pack oj-c-form-layout recipes for modern Redwood form patterns.",
    image: "oj-ux-icon-size-12x oj-ux-ico-form-layout-jet",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  FormLayoutComponent["id"],
  FormLayoutComponent
>(formLayoutComponents, {
  keyAttributes: "id",
});

const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<FormLayoutComponent["id"]>;

type ListViewProps = ComponentProps<"oj-list-view">;
type FormLayoutSelectedChangedEvent = ojListView.selectedChanged<
  FormLayoutComponent["id"],
  FormLayoutComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };

export default function FormLayoutHome({
  onBreadcrumbChange,
  onNavigateFormsHome,
  routeSegments,
}: NestedFormHomeProps) {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<FormLayoutComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const activeComponent = formLayoutComponents.find(
    (component) => component.id === activeComponentId,
  );
  const routeBase = routeSegments ?? exampleRoute.segments.slice(0, 1);
  const activeRouteComponent =
    formLayoutComponents.find(
      (component) => component.routeId === exampleRoute.segments[routeBase.length],
    ) ??
    (exampleRoute.segments.length > routeBase.length
      ? formLayoutComponents.find(
          (component) =>
            "isCorePack" in component && Boolean(component.isCorePack),
        ) ?? formLayoutComponents[0]
      : undefined);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        FormLayoutComponent["id"],
        FormLayoutComponent
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
        return <FormLayoutLegacy />;
      case 2:
        return <FormLayoutCorePack />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: FormLayoutSelectedChangedEvent) => {
    const selectedKey = event.detail.items[0]?.key as FormLayoutComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = formLayoutComponents.find(
        (component) => component.id === selectedKey,
      );
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      setSelectedItems(event.detail.value as KeySet<FormLayoutComponent["id"]>);
      if (selectedComponent) {
        exampleRoute.routeTo([...routeBase, selectedComponent.routeId]);
      }
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<FormLayoutComponent["id"]>);
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
      { label: "Forms", onSelect: onNavigateFormsHome },
      { label: "Form Layout", onSelect: handleBack },
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
    onNavigateFormsHome,
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
}
