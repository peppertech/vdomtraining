import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import BadgeHome from "./badge/home";
import ButtonsHome from "./button/home";
import FilePickerHome from "./file-picker/home";
import FilmStripHome from "./film-strip/home";
import ProgressHome from "./progress/home";
import ToolbarHome from "./toolbar/home";
import TrainHome from "./train/home";
import TruncatingTextHome from "./truncating-text/home";
import CSSImage from "./image/cssimage";
import IconFont from "./image/iconfont";
import AvatarsHome from "./avatars/home";
import MenuHome from "./menu/home";
import MessageHome from "./message/home";
import {
  CatalogBreadcrumb,
  type CatalogBreadcrumbItem,
  type NestedCatalogHomeProps,
  formatCorePackLabel,
} from "../../../shared/catalog-breadcrumb";
import { useExampleRoute } from "../example-route-context";

type ControlComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
  render?: (props?: NestedCatalogHomeProps) => h.JSX.Element | null;
};

const controlComponents: ControlComponent[] = [
  {
    id: 1,
    routeId: "avatars",
    name: "Avatars",
    image: "oj-ux-icon-size-12x  oj-ux-ico-avatar",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <AvatarsHome {...props} />,
  },
  {
    id: 2,
    routeId: "badges",
    name: "Badges",
    image: "oj-ux-icon-size-12x oj-ux-ico-badge",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <BadgeHome {...props} />,
  },
  {
    id: 3,
    routeId: "buttons",
    name: "Buttons",
    image: "oj-ux-icon-size-12x oj-ux-ico-button",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <ButtonsHome {...props} />,
  },
  {
    id: 6,
    routeId: "file-picker",
    name: "File Picker",
    image: "oj-ux-icon-size-12x oj-ux-ico-upload",
    isAvailable: true,
    render: (props) => <FilePickerHome {...props} />,
  },
  {
    id: 7,
    routeId: "film-strip",
    name: "Film Strip",
    image: "oj-ux-icon-size-12x  oj-ux-ico-film",
    isAvailable: true,
    render: (props) => <FilmStripHome {...props} />,
  },
  {
    id: 4,
    routeId: "menus",
    name: "Menus",
    image: "oj-ux-icon-size-12x oj-ux-ico-menu",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <MenuHome {...props} />,
  },
  {
    id: 12,
    routeId: "messages",
    name: "Messages",
    image: "oj-ux-icon-size-12x  oj-ux-ico-messages",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <MessageHome {...props} />,
  },
  {
    id: 8,
    routeId: "progress-indicators",
    name: "Progress Indicators",
    image: "oj-ux-icon-size-12x  oj-ux-ico-progress-linear",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <ProgressHome {...props} />,
  },
  {
    id: 9,
    routeId: "toolbar",
    name: "Toolbar",
    image: "oj-ux-icon-size-12x oj-ux-ico-toolbar",
    isAvailable: true,
     isCorePack: true,
    render: (props) => <ToolbarHome {...props} />,
  },
  {
    id: 10,
    routeId: "train",
    name: "Train",
    image: "oj-ux-icon-size-12x oj-ux-ico-train",
    isAvailable: true,
    render: (props) => <TrainHome {...props} />,
  },
  {
    id: 13,
    routeId: "truncating-text",
    name: "Truncating Text",
    image: "oj-ux-icon-size-12x oj-ux-ico-text",
    isAvailable: true,
    isCorePack: true,
    render: (props) => <TruncatingTextHome {...props} />,
  },
  // {
  //   id: 11,
  //   name: "Images & Icons",
  //   image: "oj-ux-icon-size-12x oj-ux-ico-image",
  //   isAvailable: true,
  // },
  
];

const dataProvider = new MutableArrayDataProvider<
  ControlComponent["id"],
  ControlComponent
>(controlComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type ControlSelectedChangedEvent = ojListView.selectedChanged<
  ControlComponent["id"],
  ControlComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<ControlComponent["id"]>;

const ImageShowcase = () => (
  <div class="oj-flex oj-sm-flex-direction-column oj-sm-row-gap-2x">
    <CSSImage />
    <IconFont />
  </div>
);

const ControlHome = () => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<ControlComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const [isComponentAvailable, setIsComponentAvailable] = useState(false);
  const [nestedBreadcrumbItems, setNestedBreadcrumbItems] = useState<
    CatalogBreadcrumbItem[] | null
  >(null);
  const activeRouteComponent = controlComponents.find(
    (component) => component.routeId === exampleRoute.segments[0],
  );

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
    const activeComponent = controlComponents.find(
      (component) => component.id === activeComponentId,
    );
    if (activeComponent?.render) {
      return activeComponent.render({
        onBreadcrumbChange: setNestedBreadcrumbItems,
        onNavigateRootHome: handleHomeNavigation,
      });
    }

    switch (activeComponentId) {
      case 11:
        return <ImageShowcase />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setNestedBreadcrumbItems(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<ControlComponent["id"]>);
    exampleRoute.routeTo([]);
  }, [exampleRoute]);

  const handleSelectedChanged = (event: ControlSelectedChangedEvent) => {
    if (event.detail.updatedFrom && event.detail.updatedFrom !== "internal") {
      return;
    }

    const selectedKey = event.detail.items?.[0]?.key as
      | ControlComponent["id"]
      | undefined;
    if (typeof selectedKey === "number") {
      const selectedComponent = controlComponents.find(
        (component) => component.id === selectedKey,
      );

      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      setNestedBreadcrumbItems(null);
      const selection = event.detail.value as KeySet<ControlComponent["id"]>;
      setSelectedItems(selection);
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));

      if (selectedComponent) {
        exampleRoute.routeTo([selectedComponent.routeId]);
      }
    }
  };

  useEffect(() => {
    if (activeRouteComponent) {
      setActiveComponentId(activeRouteComponent.id);
      setShowComponentDetail(true);
      setNestedBreadcrumbItems(null);
      setSelectedItems(
        new KeySetImpl([activeRouteComponent.id]) as KeySet<
          ControlComponent["id"]
        >,
      );
      setIsComponentAvailable(Boolean(activeRouteComponent.isAvailable));
      return;
    }

    if (exampleRoute.segments.length === 0) {
      setActiveComponentId(null);
      setShowComponentDetail(false);
      setNestedBreadcrumbItems(null);
      setSelectedItems(new KeySetImpl([]) as KeySet<ControlComponent["id"]>);
    }
  }, [activeRouteComponent, exampleRoute.segments.length]);

  const activeComponent = controlComponents.find(
    (component) => component.id === activeComponentId,
  );
  const breadcrumbItems: CatalogBreadcrumbItem[] = nestedBreadcrumbItems ?? [
    { label: "Controls", onSelect: handleHomeNavigation },
    {
      label: activeComponent
        ? formatCorePackLabel(activeComponent.name, activeComponent.isCorePack)
        : "Component",
      current: true,
    },
  ];

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
          <CatalogBreadcrumb items={breadcrumbItems} ariaLabel="Control breadcrumb" />
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
