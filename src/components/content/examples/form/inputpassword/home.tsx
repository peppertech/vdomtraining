import "ojs/ojactioncard";
import { KeySet,KeySetImpl } from "ojs/ojkeyset";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useEffect,useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import { useExampleRoute } from "../../example-route-context";
import {
  type NestedFormHomeProps,
  formatCorePackLabel,
} from "../form-breadcrumb";
import InputPasswordCorePack from "./inputPasswordCorePack/index";
import InputPassword from "./inputPasswordLegacy/index";

type PasswordComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isCorePack?: boolean;
};

const passwordComponents: PasswordComponent[] = [
  {
    id: 1,
    routeId: "input-password-corepack",
    name: "Input Password (oj-c)",
    image: "oj-ux-icon-size-12x oj-ux-ico-lock",
    isCorePack: true,
  },
  {
    id: 2,
    routeId: "input-password-oj-input-password",
    name: "Input Password (oj-input-password)",
    image: "oj-ux-icon-size-12x oj-ux-ico-lock",
    isCorePack: false,
  },
];

const dataProvider = new MutableArrayDataProvider<
  PasswordComponent["id"],
  PasswordComponent
>(passwordComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type PasswordSelectedChangedEvent = ojListView.selectedChanged<
  PasswordComponent["id"],
  PasswordComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<PasswordComponent["id"]>;

const InputPasswordHome = ({
  onBreadcrumbChange,
  onNavigateFormsHome,
  routeSegments,
}: NestedFormHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<PasswordComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        PasswordComponent["id"],
        PasswordComponent
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
    switch (activeComponentId) {
      case 1:
        return <InputPasswordCorePack />;
      case 2:
        return <InputPassword />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const activeComponent = passwordComponents.find(
    (component) => component.id === activeComponentId,
  );
  const routeBase = routeSegments ?? exampleRoute.segments.slice(0, 1);
  const activeRouteComponent =
    passwordComponents.find(
      (component) => component.routeId === exampleRoute.segments[routeBase.length],
    ) ??
    (exampleRoute.segments.length > routeBase.length
      ? passwordComponents.find(
          (component) =>
            "isCorePack" in component && Boolean(component.isCorePack),
        ) ?? passwordComponents[0]
      : undefined);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<PasswordComponent["id"]>,
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
      { label: "Input Password", onSelect: handleHomeNavigation },
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

  const handleSelectedChanged = (event: PasswordSelectedChangedEvent) => {
    const selectedKey = event.detail.items?.[0]?.key as PasswordComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = passwordComponents.find(
        (component) => component.id === selectedKey,
      );
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<PasswordComponent["id"]>;
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

export default InputPasswordHome;
