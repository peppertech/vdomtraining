import { h } from "preact";
import type { ComponentProps } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "oj-c/buttonset-multiple";
import "oj-c/select-multiple";

type ToggleItem = NonNullable<ComponentProps<"oj-c-buttonset-multiple">["items"]>[number];
type ButtonsetMultipleValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-buttonset-multiple">["onvalueChanged"]>
>[0];
type SelectMultipleValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-select-multiple">["onvalueChanged"]>
>[0];

type Label = {
  value: string;
  label: string;
};

type ItemInfo = {
  value: string;
  short?: string;
  regular: string;
  extra?: string;
  icons: { class: string };
};

const getViewportWidth = () => (typeof window === "undefined" ? 1280 : innerWidth);

const itemValues: ItemInfo[] = [
  { value: "home", regular: "Home", icons: { class: "oj-ux-ico-home" } },
  {
    value: "guide",
    short: "Guide",
    regular: "Quick Reference Guide",
    icons: { class: "oj-ux-ico-education" }
  },
  { value: "lib", short: "Lib", regular: "Library", icons: { class: "oj-ux-ico-library" } },
  {
    value: "styles",
    short: "Styles",
    regular: "Style Lab",
    icons: { class: "oj-ux-ico-color-palette" }
  },
  {
    value: "faq",
    regular: "FAQ",
    extra: "Frequently Asked Questions",
    icons: { class: "oj-ux-ico-chat" }
  }
];

const vehicleButtonsetLabels = [
  { value: "Bus", label: "Bus" },
  { value: "Bike", label: "Bike" },
  { value: "Car", label: "Car" },
  { value: "Truck", label: "Truck" }
] satisfies ToggleItem[];

const completeVehicleButtonsetLabels = [
  { value: "Bus", label: "AutoBus" },
  { value: "Bike", label: "Bicycle" },
  { value: "Car", label: "Carriage" },
  { value: "Truck", label: "Cargo Vehicle" }
] satisfies ToggleItem[];

const vehicleOptions: Label[] = [
  { value: "Bus", label: "AutoBus" },
  { value: "Bike", label: "Bicycle" },
  { value: "Car", label: "Carriage" },
  { value: "Truck", label: "Cargo Vehicle" }
];

const getScreenRange = (width: number) => {
  if (width < 768) {
    return "sm";
  }
  if (width < 1024) {
    return "md";
  }
  if (width < 1440) {
    return "lg";
  }
  return "xl";
};

const getItemLabels = (size: string): ToggleItem[] => {
  switch (size) {
    case "xl":
      return itemValues.map((toggle) => ({
        value: toggle.value,
        label: toggle.extra ?? toggle.regular,
        startIcon: toggle.icons
      }));
    case "md":
      return itemValues.map((toggle) => ({
        value: toggle.value,
        label: toggle.short ?? toggle.regular,
        startIcon: toggle.icons
      }));
    default:
      return itemValues.map((toggle) => ({
        value: toggle.value,
        label: toggle.regular,
        startIcon: toggle.icons
      }));
  }
};

export const ButtonsetmultipleButtonResponsivecorepack = () => {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);
  const [itemChoice, setItemChoice] = useState<string[]>(["guide"]);
  const [vehicleChoices, setVehicleChoices] = useState<string[]>(["Car"]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(getViewportWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screenRange = getScreenRange(viewportWidth);
  const isSmall = screenRange === "sm";
  const display = isSmall ? "icons" : "all";

  const itemLabels = useMemo(() => getItemLabels(screenRange), [screenRange]);

  const vehicleLabels = useMemo(
    () =>
      screenRange === "xl" || screenRange === "lg"
        ? completeVehicleButtonsetLabels
        : vehicleButtonsetLabels,
    [screenRange]
  );

  const vehicleValuesDP = useMemo(
    () => new ArrayDataProvider<string, Label>(vehicleOptions, { keyAttributes: "value" }),
    []
  );

  const handleItemChoiceChanged = (event: ButtonsetMultipleValueChangedEvent) => {
    setItemChoice((event.detail.value as string[]) ?? []);
  };

  const handleVehicleChoicesChanged = (event: ButtonsetMultipleValueChangedEvent) => {
    setVehicleChoices((event.detail.value as string[]) ?? []);
  };

  const handleVehicleSelectChanged = (event: SelectMultipleValueChangedEvent) => {
    const nextValue = event.detail.value;
    setVehicleChoices(nextValue ? Array.from(nextValue as Set<string>) : []);
  };

  return (
    <div id="buttons-container">
      <div class="oj-typography-bold oj-sm-margin-2x-bottom">
        Current screen width:
        <span> {screenRange.toUpperCase()}</span>
      </div>
      <p>
        In this example, the labels are shortened as the screen shrinks from extra large to medium,
        and are hidden entirely on small screens (by setting the Buttons&apos;{" "}
        <code class="prettyprint">display</code> option to <code class="prettyprint">icons</code>).
      </p>

      <div class="oj-sm-margin-6x-bottom">
        <oj-c-buttonset-multiple
          id="itemset"
          value={itemChoice}
          onvalueChanged={handleItemChoiceChanged}
          layoutWidth="auto"
          items={itemLabels}
          display={display}
          aria-label="Choose only one item."
        />
      </div>

      <p>This demo replaces the Buttonset with a Select on small screens.</p>

      {!isSmall ? (
        <oj-c-buttonset-multiple
          id="vehicleset"
          value={vehicleChoices}
          onvalueChanged={handleVehicleChoicesChanged}
          layoutWidth="auto"
          items={vehicleLabels}
          display={display}
          aria-label="Select only one vehicle."
        />
      ) : (
        <oj-c-select-multiple
          id="select"
          value={new Set(vehicleChoices)}
          onvalueChanged={handleVehicleSelectChanged}
          labelHint="Select vehicles"
          itemText="label"
          data={vehicleValuesDP}
          maxWidth="sm"
        />
      )}
    </div>
  );
};

export default ButtonsetmultipleButtonResponsivecorepack;
