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
import InputDate from "./inputDate/index";
import InputDateMask from "./inputDateMask/index";
import InputDatePicker from "./inputDatePicker/index";
import InputDateText from "./inputDateText/index";
import InputDateTime from "./inputDateTime/index";
import InputMonthMask from "./inputMonthMask/index";
import InputTime from "./inputTime/index";
import InputTimeMask from "./inputTimeMask/index";

type DateTimeComponent = {
  id: number;
  routeId: string;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
};

const dateTimeComponents: DateTimeComponent[] = [
  {
    id: 1,
    routeId: "input-date",
    name: "Input Date",
    image: "oj-ux-icon-size-12x oj-ux-ico-calendar",
    isAvailable: true,
  },
  {
    id: 2,
    routeId: "input-date-mask",
    name: "Input Date Mask",
    image: "oj-ux-icon-size-12x oj-ux-ico-calendar-clock",
    isCorePack: true,
    isAvailable: true,
  },
  {
    id: 3,
    routeId: "input-date-picker",
    name: "Input Date Picker",
    image: "oj-ux-icon-size-12x  oj-ux-ico-type-date-input",
    isCorePack: true,
    isAvailable: true,
  },
  {
    id: 4,
    routeId: "input-date-text",
    name: "Input Date Text",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 5,
    routeId: "input-date-time",
    name: "Input Date Time",
    image: "oj-ux-icon-size-12x oj-ux-ico-calendar-clock",
    isAvailable: true,
  },
  {
    id: 6,
    routeId: "input-month-mask",
    name: "Input Month Mask ",
    image: "oj-ux-icon-size-12x oj-ux-ico-calendar",
    isCorePack: true,
    isAvailable: true,
  },
  {
    id: 7,
    routeId: "input-time",
    name: "Input Time",
    image: "oj-ux-icon-size-12x oj-ux-ico-clock",
    isAvailable: true,
  },
  {
    id: 8,
    routeId: "input-time-mask",
    name: "Input Time Mask ",
    image: "oj-ux-icon-size-12x oj-ux-ico-clock",
    isCorePack: true,
    isAvailable: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  DateTimeComponent["id"],
  DateTimeComponent
>(dateTimeComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type DateTimeSelectedChangedEvent = ojListView.selectedChanged<
  DateTimeComponent["id"],
  DateTimeComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<DateTimeComponent["id"]>;

const InputDateTimeHome = ({
  onBreadcrumbChange,
  onNavigateFormsHome,
  routeSegments,
}: NestedFormHomeProps) => {
  const exampleRoute = useExampleRoute();
  const [selectedItems, setSelectedItems] =
    useState<KeySet<DateTimeComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );
  const [isComponentAvailable, setIsComponentAvailable] = useState(false);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        DateTimeComponent["id"],
        DateTimeComponent
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
        return <InputDate />;
      case 2:
        return <InputDateMask />;
      case 3:
        return <InputDatePicker />;
      case 4:
        return <InputDateText />;
      case 5:
        return <InputDateTime />;
      case 6:
        return <InputMonthMask />;
      case 7:
        return <InputTime />;
      case 8:
        return <InputTimeMask />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const activeComponent = dateTimeComponents.find(
    (component) => component.id === activeComponentId,
  );
  const routeBase = routeSegments ?? exampleRoute.segments.slice(0, 1);
  const activeRouteComponent =
    dateTimeComponents.find(
      (component) => component.routeId === exampleRoute.segments[routeBase.length],
    ) ??
    (exampleRoute.segments.length > routeBase.length
      ? dateTimeComponents.find(
          (component) =>
            "isCorePack" in component && Boolean(component.isCorePack),
        ) ?? dateTimeComponents[0]
      : undefined);

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<DateTimeComponent["id"]>,
    );
    setIsComponentAvailable(false);
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
      setIsComponentAvailable(Boolean(activeRouteComponent.isAvailable));
      return;
    }

    if (exampleRoute.segments.length <= routeBase.length) {
      setShowComponentDetail(false);
      setActiveComponentId(null);
      setSelectedItems(new KeySetImpl([]) as typeof INITIAL_SELECTION);
      setIsComponentAvailable(false);
    }
  }, [activeRouteComponent, exampleRoute.segments.length, routeBase.length]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Forms", onSelect: onNavigateFormsHome },
      { label: "Date & Time Inputs", onSelect: handleHomeNavigation },
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
    handleHomeNavigation,
    onBreadcrumbChange,
    onNavigateFormsHome,
    showComponentDetail,
  ]);

  const handleSelectedChanged = (event: DateTimeSelectedChangedEvent) => {
    const selectedKey = event.detail.items[0]?.key as DateTimeComponent["id"];
    if (typeof selectedKey === "number") {
      const selectedComponent = dateTimeComponents.find(
        (component) => component.id === selectedKey,
      );
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<DateTimeComponent["id"]>;
      setSelectedItems(selection);
      setIsComponentAvailable(Boolean(selectedComponent?.isAvailable));

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

export default InputDateTimeHome;
