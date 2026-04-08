import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";
import { ButtonElement } from "ojs/ojbutton";

import Badge from "./badge";
import ButtonsHome from "./button/home";
import ConveyorBelt from "./conveyorbelt";
import FilePicker from "./filepicker";
import FilmStrip from "./filmstrip";
import ProgressHome from "./progress/home";
import Toolbar from "./toolbar";
import Train from "./train";
import CSSImage from "./image/cssimage";
import IconFont from "./image/iconfont";
import AvatarsHome from "./avatars/home";
import MenuHome from "./menu/home";
import MessageHome from "./message/home";

type ControlComponent = {
  id: number;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
};

const controlComponents: ControlComponent[] = [
  {
    id: 1,
    name: "Avatars",
    image: "oj-ux-icon-size-12x  oj-ux-ico-avatar",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 2,
    name: "Badges",
    image: "oj-ux-icon-size-12x oj-ux-ico-badge",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Buttons",
    image: "oj-ux-icon-size-12x oj-ux-ico-button",
    isAvailable: true,
    isCorePack: true
  },
  {
    id: 4,
    name: "Menu & Menu Button",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu",
    isAvailable: true,
    isCorePack: true
  },
  {
    id: 5,
    name: "Conveyor Belt",
    image: "oj-ux-icon-size-12x oj-ux-ico-carousel",
    isAvailable: true,
    isCorePack: false
  },
  {
    id: 6,
    name: "File Picker",
    image: "oj-ux-icon-size-12x oj-ux-ico-upload",
    isAvailable: true,
  },
  {
    id: 7,
    name: "Film Strip",
    image: "oj-ux-icon-size-12x  oj-ux-ico-film",
    isAvailable: true,
  },
  {
    id: 8,
    name: "Progress Indicators",
    image: "oj-ux-icon-size-12x  oj-ux-ico-progress-linear",
    isAvailable: true,
    isCorePack: true
  },
  {
    id: 9,
    name: "Toolbar",
    image: "oj-ux-icon-size-12x oj-ux-ico-toolbar",
    isAvailable: true,
  },
  {
    id: 10,
    name: "Train",
    image: "oj-ux-icon-size-12x oj-ux-ico-train",
    isAvailable: true,
  },
  {
    id: 11,
    name: "Images & Icons",
    image: "oj-ux-icon-size-12x oj-ux-ico-image",
    isAvailable: true,
  },
  {
    id: 12,
    name: "Messages",
    image: "oj-ux-icon-size-12x  oj-ux-ico-messages",
    isAvailable: true,
    isCorePack: true,
  }
  
];

const dataProvider = new MutableArrayDataProvider<
  ControlComponent["id"],
  ControlComponent
>(controlComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<ControlComponent["id"]>;

const BadgeShowcase = () => <Badge />;

const ImageShowcase = () => (
  <div class="oj-flex oj-sm-flex-direction-column oj-sm-row-gap-2x">
    <CSSImage />
    <IconFont />
  </div>
);

const ControlHome = () => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<ControlComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const [isComponentAvailable, setIsComponentAvailable] = useState(false);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        ControlComponent["id"],
        ControlComponent
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
        return <AvatarsHome />;
      case 2:
        return <BadgeShowcase />;
      case 3:
        return <ButtonsHome />;
      case 4:
        return <MenuHome />;
      case 5:
        return <ConveyorBelt />;
      case 6:
        return <FilePicker />;
      case 7:
        return <FilmStrip />;
      case 8:
        return <ProgressHome />;
      case 9:
        return <Toolbar />;
      case 10:
        return <Train />;
      case 11:
        return <ImageShowcase />;
      case 12:
        return <MessageHome />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleHomeNavigation = (_event: ButtonElement.ojAction) => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(new KeySetImpl([]) as KeySet<ControlComponent["id"]>);
  };

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as ControlComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<ControlComponent["id"]>;
      setSelectedItems(selection);

      const selectedComponent = controlComponents.find(
        (component) => component.id === selectedKey,
      );
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));
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
          <oj-button class="breadcrumb-wrapper"  label=" Home " onojAction={handleHomeNavigation} />
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

export default ControlHome;
