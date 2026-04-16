import { h, ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/buttonset-multiple";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";

type ButtonsetMultipleProps = ComponentProps<"oj-c-buttonset-multiple">;
type ButtonsetMultipleItem = NonNullable<ButtonsetMultipleProps["items"]>[number];
type ButtonsetMultipleValueChangedEvent = Parameters<
  NonNullable<ButtonsetMultipleProps["onvalueChanged"]>
>[0];

const createIcon = (iconClass: string) => ({
  type: "class" as const,
  class: `oj-button-icon oj-start ${iconClass}`,
});

const textItems: ButtonsetMultipleItem[] = [
  { value: "bold", label: "Bold" },
  { value: "italic", label: "Italic" },
  { value: "underline", label: "Underline" },
];

const iconItems: ButtonsetMultipleItem[] = [
  { value: "home", label: "Home", startIcon: createIcon("oj-ux-ico-home") },
  { value: "library", label: "Library", startIcon: createIcon("oj-ux-ico-library") },
  { value: "apps", label: "Apps", startIcon: createIcon("oj-ux-ico-apps") },
];

const drinkItems: ButtonsetMultipleItem[] = [
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "juice", label: "Juice" },
  { value: "water", label: "Water" },
];

const CorePackButtonsetMultiple = () => {
  const [basicValues, setBasicValues] = useState(["bold", "italic"]);
  const [iconValues, setIconValues] = useState(["home"]);
  const [chromingValues, setChromingValues] = useState(["bold"]);
  const [layoutAuto, setLayoutAuto] = useState(["bold", "italic"]);
  const [layoutEqual, setLayoutEqual] = useState(["bold"]);
  const [responsiveValues, setResponsiveValues] = useState(["coffee", "tea"]);

  const buttonsetSectionClass = "oj-sm-padding-2x";

  const sizeItems = useMemo<ButtonsetMultipleItem[]>(() => {
    return textItems.map((item) => ({ ...item }));
  }, []);

  const handleValueChange =
    (setter: (value: string[]) => void, fallback: string[]) =>
    (event: ButtonsetMultipleValueChangedEvent) => {
      const value = event.detail.value;
      setter(Array.isArray(value) ? value : fallback);
    };

  return (
    <div id="buttons-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Text Buttonset</h6>
      <div class={buttonsetSectionClass}>
        <oj-c-buttonset-multiple
          id="cbuttonset-multiple-basic"
          display="label"
          value={basicValues}
          items={textItems}
          aria-label="Select one or more formatting options."
          onvalueChanged={handleValueChange(setBasicValues, ["bold"])}
        ></oj-c-buttonset-multiple>
      </div>

      <h6>Icon Buttonset</h6>
      <div class={buttonsetSectionClass}>
        <oj-c-buttonset-multiple
          id="cbuttonset-multiple-icons"
          display="icons"
          value={iconValues}
          items={iconItems}
          aria-label="Select navigation shortcuts."
          onvalueChanged={handleValueChange(setIconValues, ["home"])}
        ></oj-c-buttonset-multiple>
      </div>

      <h6>Chroming</h6>
      <div class={buttonsetSectionClass}>
        <oj-c-buttonset-multiple
          id="cbuttonset-multiple-chroming-borderless"
          chroming="borderless"
          items={textItems}
          value={chromingValues}
          aria-label="Borderless buttonset example."
          onvalueChanged={handleValueChange(setChromingValues, ["bold"])}
        ></oj-c-buttonset-multiple>
        <oj-c-buttonset-multiple
          id="cbuttonset-multiple-chroming-outlined"
          chroming="outlined"
          class="oj-sm-margin-2x-start"
          items={textItems}
          value={textItems.map((item) => item.value)}
          aria-label="Outlined buttonset example."
          disabled
        ></oj-c-buttonset-multiple>
      </div>

      <h6>Sizes</h6>
      <div class={buttonsetSectionClass}>
        <oj-c-buttonset-multiple
          id="cbuttonset-multiple-size-sm"
          size="sm"
          items={sizeItems}
          value={["bold"]}
          aria-label="Small buttonset example."
        ></oj-c-buttonset-multiple>
        <oj-c-buttonset-multiple
          id="cbuttonset-multiple-size-md"
          size="md"
          items={sizeItems}
          value={sizeItems.map((item) => item.value)}
          class="oj-sm-margin-2x-start"
          aria-label="Medium buttonset example."
        ></oj-c-buttonset-multiple>
        <oj-c-buttonset-multiple
          id="cbuttonset-multiple-size-lg"
          size="lg"
          items={sizeItems}
          value={["italic"]}
          class="oj-sm-margin-2x-start"
          aria-label="Large buttonset example."
        ></oj-c-buttonset-multiple>
      </div>

      <h6>Layout Width</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel">
        <div class={buttonsetSectionClass}>
          <p class="oj-typography-body-sm">
            Use <code>layoutWidth=&quot;auto&quot;</code> when button widths should adjust to content size.
          </p>
          <oj-c-buttonset-multiple
            id="cbuttonset-multiple-layout-auto"
            layoutWidth="auto"
            items={textItems}
            value={layoutAuto}
            aria-label="Auto layout width example."
            onvalueChanged={handleValueChange(setLayoutAuto, ["bold"])}
          ></oj-c-buttonset-multiple>
        </div>
      </div>

      <div class="oj-panel oj-bg-neutral-30 demo-mypanel oj-sm-margin-4x-top">
        <div class={buttonsetSectionClass}>
          <p class="oj-typography-body-sm">
            Use <code>layoutWidth=&quot;equal&quot;</code> when all buttons must have equal width.
          </p>
          <oj-c-buttonset-multiple
            id="cbuttonset-multiple-layout-equal"
            layoutWidth="equal"
            items={textItems}
            value={layoutEqual}
            aria-label="Equal layout width example."
            onvalueChanged={handleValueChange(setLayoutEqual, ["bold"])}
          ></oj-c-buttonset-multiple>
        </div>
      </div>

      <h6>Responsive</h6>
      <oj-label-value label-edge="top">
        <oj-label slot="label" id="cbuttonset-multiple-label">
          Favorite Drinks
        </oj-label>
        <div slot="value" class={buttonsetSectionClass}>
          <oj-c-buttonset-multiple
            id="cbuttonset-multiple-responsive"
            items={drinkItems}
            value={responsiveValues}
            aria-labelledby="cbuttonset-multiple-label"
            aria-label="Choose your preferred beverages."
            onvalueChanged={handleValueChange(setResponsiveValues, ["coffee"])}
          ></oj-c-buttonset-multiple>
        </div>
      </oj-label-value>
    </div>
  );
};

export default CorePackButtonsetMultiple;
