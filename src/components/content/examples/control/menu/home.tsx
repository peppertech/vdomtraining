import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import Menu from "./menu";
import MenuButton from "./menuButton";
import MenuSelectMany from "./menuselectmany";
import CorePackMenuButton from "./corePackMenuButton";
import CorePackSplitMenuButton from "./corePackSplitMenuButton";

interface MenuComponent {
  id: number;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
}

const menuComponents: MenuComponent[] = [
  {
    id: 1,
    name: "Menu",
    description: "Classic oj-menu-button with nested oj-menu actions.",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-modal",
  },
  {
    id: 2,
    name: "Menu Button",
    description: "Focused oj-menu-button demo including icon, submenu, and disabled scenarios.",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
  },
  {
    id: 3,
    name: "Menu Select Many",
    description: "oj-menu-select-many embedded in an oj-menu for multi-select settings.",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-select-many",
  },
  {
    id: 4,
    name: "Menu Button (oj-c)",
    description: "Core Pack menu button with selection writeback and chroming variants.",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
    isCorePack: true,
  },
  {
    id: 5,
    name: "Split Menu Button (oj-c)",
    description: "Core Pack split menu button illustrating primary vs menu actions.",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu-button",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<MenuComponent["id"], MenuComponent>(
  menuComponents,
  {
    keyAttributes: "id",
  },
);

const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<MenuComponent["id"]>;

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };

const MenuHome = () => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<MenuComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);

  const renderListItem = useCallback(
    (item: ojListView.ItemTemplateContext<MenuComponent["id"], MenuComponent>) => (
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
        return <Menu />;
      case 2:
        return <MenuButton />;
      case 3:
        return <MenuSelectMany />;
      case 4:
        return <CorePackMenuButton />;
      case 5:
        return <CorePackSplitMenuButton />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as MenuComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<MenuComponent["id"]>;
      setSelectedItems(selection);
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
          <oj-button
            chroming="borderless"
            display="icons"
            onojAction={() => {
              setShowComponentDetail(false);
              setActiveComponentId(null);
              setSelectedItems(new KeySetImpl([]) as KeySet<MenuComponent["id"]>);
            }}
          >
            <span slot="startIcon" class="oj-ux-ico-chevron-left"></span>
            Menu Components
          </oj-button>
          {ComponentDetail()}
        </div>
      )}
    </div>
  );
};

export default MenuHome;
