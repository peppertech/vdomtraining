import { h } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojbutton";
import "ojs/ojoption";
import "ojs/ojselectsingle";

const itemValues = [
  { id: "Home", icon: "oj-ux-ico-home" },
  { id: "Guide", icon: "oj-ux-ico-education" },
  { id: "Library", icon: "oj-ux-ico-library" },
  { id: "Styles", icon: "oj-ux-ico-color-palette" },
  { id: "FAQ", icon: "oj-ux-ico-chat" },
];

const vehicleValues = [
  { value: "Bus", label: "AutoBus" },
  { value: "Bike", label: "Bicycle" },
  { value: "Car", label: "Carriage" },
  { value: "Truck", label: "Cargo Vehicle" },
];

export const ButtonsetoneButtonResponsive = () => {
  const [screenRange, setScreenRange] = useState("lg");
  const [isSmall, setIsSmall] = useState(false);
  const [vehicleChoice, setVehicleChoice] = useState("Car");
  const vehicleValuesDP = useMemo(
    () =>
      new ArrayDataProvider(vehicleValues, {
        keyAttributes: "value",
      }),
    []
  );

  useEffect(() => {
    const smQuery =
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY) ||
      "(max-width: 599px)";
    const mdQuery =
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_ONLY) ||
      "(min-width: 600px) and (max-width: 1023px)";
    const lgQuery =
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_ONLY) ||
      "(min-width: 1024px) and (max-width: 1439px)";
    const xlQuery =
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.XL_UP) ||
      "(min-width: 1440px)";

    const updateResponsiveState = () => {
      const small = window.matchMedia(smQuery).matches;
      setIsSmall(small);

      if (window.matchMedia(xlQuery).matches) {
        setScreenRange("xl");
      } else if (window.matchMedia(lgQuery).matches) {
        setScreenRange("lg");
      } else if (window.matchMedia(mdQuery).matches) {
        setScreenRange("md");
      } else if (small) {
        setScreenRange("sm");
      }
    };

    updateResponsiveState();
    window.addEventListener("resize", updateResponsiveState);

    return () => {
      window.removeEventListener("resize", updateResponsiveState);
    };
  }, []);

  const itemLabels = useMemo(() => {
    if (screenRange === "xl") {
      return ["Home", "Quick Reference Guide", "Library", "Style Lab", "Frequently Asked Questions"];
    }
    if (screenRange === "md") {
      return ["Home", "Guide", "Lib", "Styles", "FAQ"];
    }
    return ["Home", "Quick Reference Guide", "Library", "Style Lab", "FAQ"];
  }, [screenRange]);

  const vehicleLabels = useMemo(
    () =>
      screenRange === "xl" || screenRange === "lg"
        ? ["AutoBus", "Bicycle", "Carriage", "Cargo Vehicle"]
        : ["Bus", "Bike", "Car", "Truck"],
    [screenRange]
  );
  const display = isSmall ? "icons" : "all";

  const handleVehicleChoiceChanged = (event: any) => {
    if (!event.detail.updatedFrom || event.detail.updatedFrom === "internal") {
      setVehicleChoice(event.detail.value ?? "Car");
    }
  };

  return (
    <div id="buttons-container">
      <div class="oj-typography-bold oj-sm-margin-2x-bottom">
        Current screen width:
        <span> {screenRange.toUpperCase()}</span>
      </div>
      <p>
        In this example, labels are shortened as the screen shrinks from extra large to medium and
        are hidden on small screens by setting <code className={"prettyprint"}>display</code> to{" "}
        <code className={"prettyprint"}>icons</code>.
      </p>

      <div class="oj-sm-margin-6x-bottom">
        <oj-buttonset-one
          id="itemset"
          value="Home"
          class="oj-buttonset-width-auto"
          display={display}
          aria-label="Choose only one item."
        >
          {itemValues.map((item, index) => (
            <oj-option key={item.id} value={item.id}>
              <span slot="startIcon" class={item.icon} />
              <span>{itemLabels[index]}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>

      <p>This demo replaces the buttonset with a select on small screens.</p>

      {!isSmall ? (
        <oj-buttonset-one
          id="vehicleset"
          class="oj-buttonset-width-auto"
          value={vehicleChoice}
          onvalueChanged={handleVehicleChoiceChanged}
          display={display}
          aria-label="Select one vehicle."
        >
          {vehicleValues.map((item, index) => (
            <oj-option key={item.value} value={item.value}>
              <span>{vehicleLabels[index]}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      ) : (
        <oj-select-single
          id="select"
          value={vehicleChoice}
          onvalueChanged={handleVehicleChoiceChanged}
          labelHint="Select vehicle"
          data={vehicleValuesDP}
          itemText="label"
          class="oj-form-control-max-width-sm"
        />
      )}
    </div>
  );
};

export default ButtonsetoneButtonResponsive;
