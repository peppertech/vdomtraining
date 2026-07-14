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
import ButtonCorePackRecipePage from "./button-corepack/index";
import ButtonLegacyRecipePage from "./button-legacy/index";
import ButtonsetManyRecipePage from "./buttonset-many/index";
import ButtonsetMultipleRecipePage from "./buttonset-multiple/index";
import ButtonsetOneRecipePage from "./buttonset-one/index";
import ButtonsetSingleRecipePage from "./buttonset-single/index";
import MenuButtonCorePackRecipePage from "./menu-button-corepack/index";
import MenuButtonLegacyRecipePage from "./menu-button-legacy/index";
import ProgressButtonCorePackRecipePage from "./progress-button-corepack/index";
import SplitMenuButtonCorePackRecipePage from "./split-menu-button-corepack/index";
import ToggleButtonCorePackRecipePage from "./toggle-button-corepack/index";

type ButtonComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
};

const buttonComponents: ButtonComponent[] = [
  {
    id: 1,
    routeId: "button-legacy",
    name: "Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-button",
    isAvailable: true,
  },
  {
    id: 6,
    routeId: "button-corepack",
    name: "Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-button",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 2,
    routeId: "buttonset-many",
    name: "Buttonset Many",
    image: "oj-ux-icon-size-12x oj-ux-ico-button-set-many",
    isAvailable: true,
  },
  {
    id: 7,
    routeId: "buttonset-multiple",
    name: "Buttonset Multiple",
    image: "oj-ux-icon-size-12x oj-ux-ico-button-set-many",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 3,
    routeId: "buttonset-one",
    name: "Buttonset One",
    image: "oj-ux-icon-size-12x oj-ux-ico-button-set-one",
    isAvailable: true,
  },
  {
    id: 5,
    routeId: "buttonset-single",
    name: "Buttonset Single ",
    image: "oj-ux-icon-size-12x oj-ux-ico-button-set-one",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 4,
    routeId: "menu-button-legacy",
    name: "Menu Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
    isAvailable: true,
  },
  {
    id: 8,
    routeId: "menu-button-corepack",
    name: "Menu Button ",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 9,
    routeId: "progress-button-corepack",
    name: "Progress Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-button",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 10,
    routeId: "split-menu-button-corepack",
    name: "Split Menu Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 11,
    routeId: "toggle-button-corepack",
    name: "Toggle Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-button",
    isAvailable: true,
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<ButtonComponent["id"], ButtonComponent>(
  buttonComponents,
  {
    keyAttributes: "id",
  },
);

type ListViewProps = ComponentProps<"oj-list-view">;
type ButtonSelectedChangedEvent = ojListView.selectedChanged<
  ButtonComponent["id"],
  ButtonComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<ButtonComponent["id"]>;

const ButtonsHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<ButtonComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const [isComponentAvailable, setIsComponentAvailable] = useState(false);
  const activeComponent = buttonComponents.find(
    (component) => component.id === activeComponentId,
  );
  const activeRouteComponent = buttonComponents.find(
    (component) => component.routeId === exampleRoute.segments[1],
  );
  const routePrefix = exampleRoute.segments[0] ?? "buttons";

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<ButtonComponent["id"], ButtonComponent>,
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
        return <ButtonLegacyRecipePage />;
      case 6:
        return <ButtonCorePackRecipePage />;
      case 3:
        return <ButtonsetOneRecipePage />;
      case 2:
        return <ButtonsetManyRecipePage />;
      case 4:
        return <MenuButtonLegacyRecipePage />;
      case 8:
        return <MenuButtonCorePackRecipePage />;
      case 5:
        return <ButtonsetSingleRecipePage />;
      case 7:
        return <ButtonsetMultipleRecipePage />;
      case 9:
        return <ProgressButtonCorePackRecipePage />;
      case 10:
        return <SplitMenuButtonCorePackRecipePage />;
      case 11:
        return <ToggleButtonCorePackRecipePage />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: ButtonSelectedChangedEvent) => {
    if (event.detail.updatedFrom && event.detail.updatedFrom !== "internal") {
      return;
    }

    const selectedKey = event.detail.items?.[0]?.key as
      | ButtonComponent["id"]
      | undefined;
    if (typeof selectedKey === "number") {
      const selectedComponent = buttonComponents.find(
        (component) => component.id === selectedKey,
      );

      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<ButtonComponent["id"]>;
      setSelectedItems(selection);
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));

      if (selectedComponent) {
        exampleRoute.routeTo([routePrefix, selectedComponent.routeId]);
      }
    }
  };
  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setIsComponentAvailable(false);
    setSelectedItems(new KeySetImpl([]) as KeySet<ButtonComponent["id"]>);
    onBreadcrumbChange?.(null);
    exampleRoute.routeTo([routePrefix]);
  }, [exampleRoute, onBreadcrumbChange, routePrefix]);

  useEffect(() => {
    if (activeRouteComponent) {
      setActiveComponentId(activeRouteComponent.id);
      setShowComponentDetail(true);
      setSelectedItems(
        new KeySetImpl([activeRouteComponent.id]) as KeySet<
          ButtonComponent["id"]
        >,
      );
      setIsComponentAvailable(Boolean(activeRouteComponent.isAvailable));
      return;
    }

    if (exampleRoute.segments.length <= 1) {
      setShowComponentDetail(false);
      setActiveComponentId(null);
      setIsComponentAvailable(false);
      setSelectedItems(new KeySetImpl([]) as KeySet<ButtonComponent["id"]>);
    }
  }, [activeRouteComponent, exampleRoute.segments.length]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Controls", onSelect: onNavigateRootHome },
      { label: "Buttons", onSelect: handleBack },
      {
        label: formatCorePackLabel(
          activeComponent.name.trim(),
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
          {isComponentAvailable ? (
            ComponentDetail()
          ) : (
            <div class="comingsoon">Coming soon....</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ButtonsHome;
