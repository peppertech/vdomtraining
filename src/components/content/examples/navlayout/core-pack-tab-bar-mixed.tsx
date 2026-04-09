import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/tab-bar-mixed";
import "oj-c/form-layout";
import "oj-c/radioset";

type TabBarMixedProps = ComponentProps<"oj-c-tab-bar-mixed">;
type StaticTab = NonNullable<TabBarMixedProps["staticTabs"]>[number];
type DynamicTab = NonNullable<TabBarMixedProps["dynamicTabs"]>[number];
type RadiosetOptions = NonNullable<ComponentProps<"oj-c-radioset">["options"]>;

const STATIC_TABS: StaticTab[] = [
  {
    itemKey: "home",
    label: "Home",
    icon: {
      type: "class",
      class: "oj-ux-ico-home",
    },
  },
  {
    itemKey: "resources",
    label: "Resources",
    icon: {
      type: "class",
      class: "oj-ux-ico-library",
    },
  },
];

const INITIAL_DYNAMIC_TABS: DynamicTab[] = [
  {
    badge: 3,
    itemKey: "lisa",
    label: "Lisa Hernandez",
  },
  {
    itemKey: "tim",
    label: "Tim Anderson",
  },
  {
    itemKey: "stephanie",
    label: "Stephanie Kim",
  },
  {
    itemKey: "adam",
    label: "Adam Susanto",
  },
  {
    badge: 7,
    itemKey: "denis",
    label: "Denis Dorsey",
  },
  {
    itemKey: "lochlan",
    label: "Lochlan Camacho",
  },
  {
    badge: 1,
    itemKey: "izaak",
    label: "Izaak Calderon",
  },
  {
    itemKey: "nancy",
    label: "Nancy Richardson",
  },
];

const displayOptions: RadiosetOptions = [
  { value: "standard", label: "Standard" },
  { value: "icons", label: "Icons" },
];

const sizeOptions: RadiosetOptions = [
  { value: "lg", label: "Large" },
  { value: "md", label: "Medium" },
];

const overflowOptions: RadiosetOptions = [
  { value: "conveyor", label: "Conveyor" },
  { value: "popup", label: "Popup" },
];

const CorePackTabBarMixed = () => {
  const [staticTabsDisplay, setStaticTabsDisplay] =
    useState<NonNullable<TabBarMixedProps["staticTabsDisplay"]>>("standard");
  const [size, setSize] =
    useState<NonNullable<TabBarMixedProps["size"]>>("lg");
  const [dynamicTabsOverflow, setDynamicTabsOverflow] =
    useState<NonNullable<TabBarMixedProps["dynamicTabsOverflow"]>>("conveyor");
  const [dynamicTabs, setDynamicTabs] =
    useState<NonNullable<TabBarMixedProps["dynamicTabs"]>>(INITIAL_DYNAMIC_TABS);
  const [selection, setSelection] = useState<string>(STATIC_TABS[0].itemKey);

  const handleStaticDisplayChanged = useCallback(
    (event: CustomEvent<{ value: typeof staticTabsDisplay | null }>) => {
      if (event.detail.value) {
        setStaticTabsDisplay(event.detail.value);
      }
    },
    [],
  );

  const handleSizeChanged = useCallback(
    (event: CustomEvent<{ value: typeof size | null }>) => {
      if (event.detail.value) {
        setSize(event.detail.value);
      }
    },
    [],
  );

  const handleOverflowChanged = useCallback(
    (event: CustomEvent<{ value: typeof dynamicTabsOverflow | null }>) => {
      if (event.detail.value) {
        setDynamicTabsOverflow(event.detail.value);
      }
    },
    [],
  );

  const handleSelectionChanged = useCallback(
    (event: CustomEvent<{ value: string | null }>) => {
      if (event.detail.value) {
        setSelection(event.detail.value);
      }
    },
    [],
  );

  const handleRemove = useCallback(
    (event: CustomEvent<{ key: string }>) => {
      const key = event.detail.key;
      setDynamicTabs((previousTabs) => {
        const updatedTabs = previousTabs.filter((tab) => tab.itemKey !== key);
        if (selection === key) {
          const nextSelection =
            updatedTabs.length > 0 ? updatedTabs[0].itemKey : STATIC_TABS[0].itemKey;
          setSelection(nextSelection);
        }
        return updatedTabs;
      });
    },
    [selection],
  );

  return (
    <div id="tab-bar-mixed-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout maxColumns={3} direction="row">
          <oj-c-radioset
            id="displayRadioId"
            value={staticTabsDisplay}
            labelHint="Static Tabs Display"
            labelEdge="inside"
            options={displayOptions}
            onvalueChanged={handleStaticDisplayChanged}
          />
          <oj-c-radioset
            id="sizeRadioId"
            value={size}
            labelHint="Size"
            labelEdge="inside"
            options={sizeOptions}
            onvalueChanged={handleSizeChanged}
          />
          <oj-c-radioset
            id="overflowRadioId"
            value={dynamicTabsOverflow}
            labelHint="Dynamic Tabs Overflow"
            labelEdge="inside"
            options={overflowOptions}
            onvalueChanged={handleOverflowChanged}
          />
        </oj-c-form-layout>
      </div>

      <oj-c-tab-bar-mixed
        dynamicTabs={dynamicTabs}
        dynamicTabsOverflow={dynamicTabsOverflow}
        onojRemove={handleRemove}
        onselectionChanged={handleSelectionChanged}
        selection={selection}
        size={size}
        staticTabs={STATIC_TABS}
        staticTabsDisplay={staticTabsDisplay}
      ></oj-c-tab-bar-mixed>
    </div>
  );
};

export { CorePackTabBarMixed };
