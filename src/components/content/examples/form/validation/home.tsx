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
import ComponentValidation from "./componentValidation/index";
import Converters from "./converters/index";
import ValidationGroup from "./validationGroup/index";
import Validators from "./validators/index";

type ValidationComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isCorePack?: boolean;
  render: () => preact.JSX.Element;
};

const validationComponents: ValidationComponent[] = [
   {
    id: 2,
    routeId: "component-validation",
    name: "Component Validation",
    image: "oj-ux-icon-size-12x  oj-ux-ico-validation-component",
    render: () => <ComponentValidation />,
  },
  {
    id: 4,
    routeId: "converters",
    name: "Converters",
    image: "oj-ux-icon-size-12x  oj-ux-ico-converter",
    render: () => <Converters />,
  },
  {
    id: 1,
    routeId: "validation-group",
    name: "Validation Group",
    image: "oj-ux-icon-size-12x  oj-ux-ico-validation",
    render: () => <ValidationGroup />,
  },
  {
    id: 3,
    routeId: "validators",
    name: "Validators",
    image: "oj-ux-icon-size-12x  oj-ux-ico-validator",
    render: () => <Validators />,
  },
  
];

const dataProvider = new MutableArrayDataProvider<
  ValidationComponent["id"],
  ValidationComponent
>(validationComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type ValidationSelectedChangedEvent = ojListView.selectedChanged<
  ValidationComponent["id"],
  ValidationComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<ValidationComponent["id"]>;

const ValidationHome = ({
  onBreadcrumbChange,
  onNavigateFormsHome,
  routeSegments,
}: NestedFormHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<ValidationComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        ValidationComponent["id"],
        ValidationComponent
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
    const entry = validationComponents.find(
      (component) => component.id === activeComponentId,
    );
    return entry?.render() ?? null;
  }, [activeComponentId]);

  const activeComponent = validationComponents.find(
    (component) => component.id === activeComponentId,
  );
  const routeBase = routeSegments ?? exampleRoute.segments.slice(0, 1);
  const activeRouteComponent =
    validationComponents.find(
      (component) => component.routeId === exampleRoute.segments[routeBase.length],
    ) ??
    (exampleRoute.segments.length > routeBase.length
      ? validationComponents.find(
          (component) =>
            "isCorePack" in component && Boolean(component.isCorePack),
        ) ?? validationComponents[0]
      : undefined);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<ValidationComponent["id"]>,
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
      { label: "Validation", onSelect: handleHomeNavigation },
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

  const handleSelectedChanged = (event: ValidationSelectedChangedEvent) => {
    const selectedKey = event.detail.items?.[0]?.key as ValidationComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = validationComponents.find(
        (component) => component.id === selectedKey,
      );
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<
        ValidationComponent["id"]
      >;
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
          {ComponentDetail() ?? <div class="comingsoon">Coming soon....</div>}
        </div>
      )}
    </div>
  );
};

export default ValidationHome;
