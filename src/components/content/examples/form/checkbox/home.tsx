import "ojs/ojactioncard";
import { KeySet,KeySetImpl } from "ojs/ojkeyset";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import * as preact from 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useEffect,useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import { useExampleRoute } from "../../example-route-context";
import {
  type NestedFormHomeProps,
  formatCorePackLabel,
} from "../form-breadcrumb";
import CheckBoxCorePack from "./checkBoxCorePack/index";
import CheckBoxSet from "./checkBoxSet/index";
import CheckBoxSetCorePack from "./checkBoxSetCorePack/index";
import RichCheckBoxsetCorePack from "./richCheckBoxsetCorePack/index";

type CheckboxComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isCorePack?: boolean;
  render: () => preact.JSX.Element;
};

const checkboxComponents: CheckboxComponent[] = [
  {
    id: 1,
    routeId: "checkbox-set-legacy",
    name: "Checkbox Set",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    render: () => <CheckBoxSet />,
  },
  {
    id: 2,
    routeId: "checkbox",
    name: "Checkbox",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    isCorePack: true,
    render: () => <CheckBoxCorePack />,
  },
  {
    id: 3,
    routeId: "checkbox-set-corepack",
    name: "Checkbox Set",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    isCorePack: true,
    render: () => <CheckBoxSetCorePack />,
  },
  {
    id: 4,
    routeId: "rich-checkbox-set",
    name: "Rich Checkbox Set",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    isCorePack: true,
    render: () => <RichCheckBoxsetCorePack />,
  },
];

const dataProvider = new MutableArrayDataProvider<
  CheckboxComponent["id"],
  CheckboxComponent
>(checkboxComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type CheckboxSelectedChangedEvent = ojListView.selectedChanged<
  CheckboxComponent["id"],
  CheckboxComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<CheckboxComponent["id"]>;

const CheckboxHome = ({
  onBreadcrumbChange,
  onNavigateFormsHome,
  routeSegments,
}: NestedFormHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<CheckboxComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        CheckboxComponent["id"],
        CheckboxComponent
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
    const entry = checkboxComponents.find(
      (component) => component.id === activeComponentId,
    );
    return entry?.render() ?? null;
  }, [activeComponentId]);

  const activeComponent = checkboxComponents.find(
    (component) => component.id === activeComponentId,
  );
  const routeBase = routeSegments ?? exampleRoute.segments.slice(0, 1);
  const activeRouteComponent =
    checkboxComponents.find(
      (component) => component.routeId === exampleRoute.segments[routeBase.length],
    ) ??
    (exampleRoute.segments.length > routeBase.length
      ? checkboxComponents.find(
          (component) =>
            "isCorePack" in component && Boolean(component.isCorePack),
        ) ?? checkboxComponents[0]
      : undefined);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<CheckboxComponent["id"]>,
    );
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
      { label: "Checkboxes", onSelect: handleHomeNavigation },
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
    handleHomeNavigation,
    onBreadcrumbChange,
    onNavigateFormsHome,
    showComponentDetail,
  ]);

  const handleSelectedChanged = (event: CheckboxSelectedChangedEvent) => {
    const selectedKey = event.detail.items?.[0]?.key as CheckboxComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = checkboxComponents.find(
        (component) => component.id === selectedKey,
      );
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<CheckboxComponent["id"]>;
      setSelectedItems(selection);

      if (selectedComponent) {
        exampleRoute.routeTo([...routeBase, selectedComponent.routeId]);
      }
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
          {ComponentDetail() ?? (
            <div class="comingsoon">Coming soon....</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckboxHome;
