import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import Button from "./button";
import ButtonSetMany from "./buttonsetmany";
import ButtonSetOne from "./buttonsetone";
import MenuButton from "./menubutton";
import ButtonsetSingle from "./buttonsetsingle";
import CorePackButton from "./corePackButton";
import CorePackButtonsetMultiple from "./corePackButtonsetMultiple";
import CorePackMenuButton from "./corePackMenuButton";
import CorePackProgressButton from "./corePackProgressButton";
import CorePackSplitMenuButton from "./corePackSplitMenuButton";
import CorePackToggleButton from "./corePackToggleButton";
import {
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../../shared/catalog-breadcrumb";

type ButtonComponent = {
  id: number;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
};

const buttonComponents: ButtonComponent[] = [
  {
    id: 1,
    name: "Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-button",
    isAvailable: true,
  },
  {
    id: 6,
    name: "Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-button",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 3,
    name: "Button Set One",
    image: "oj-ux-icon-size-12x oj-ux-ico-button-set-one",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Button Set Many",
    image: "oj-ux-icon-size-12x oj-ux-ico-button-set-many",
    isAvailable: true,
  },
  
  {
    id: 4,
    name: "Menu Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
    isAvailable: true,
  },
  {
    id: 8,
    name: "Menu Button ",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 5,
    name: "Buttonset Single ",
    image: "oj-ux-icon-size-12x oj-ux-ico-button-set-one",
    isAvailable: true,
    isCorePack: true,
  },
  
  {
    id: 7,
    name: "Buttonset Multiple",
    image: "oj-ux-icon-size-12x oj-ux-ico-button-set-many",
    isAvailable: true,
    isCorePack: true,
  },
  
  {
    id: 9,
    name: "Progress Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-button",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 10,
    name: "Split Menu Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 11,
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
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<ButtonComponent["id"]>;

const ButtonsHome = ({
  onBreadcrumbChange,
  onNavigateRootHome,
}: NestedCatalogHomeProps) => {
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
        return <Button />;
       case 6:
        return <CorePackButton />;  
      case 3:
        return <ButtonSetOne />;
      case 2:
        return <ButtonSetMany />;
      case 4:
        return <MenuButton />;
      case 8:
        return <CorePackMenuButton />;
      case 5:
        return <ButtonsetSingle />;
      case 7:
        return <CorePackButtonsetMultiple />;
      case 9:
        return <CorePackProgressButton />;
      case 10:
        return <CorePackSplitMenuButton />;
      case 11:
        return <CorePackToggleButton />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as ButtonComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<ButtonComponent["id"]>;
      setSelectedItems(selection);

      const selectedComponent = buttonComponents.find(
        (component) => component.id === selectedKey,
      );
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));
    }
  };
  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setIsComponentAvailable(false);
    setSelectedItems(new KeySetImpl([]) as KeySet<ButtonComponent["id"]>);
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

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
