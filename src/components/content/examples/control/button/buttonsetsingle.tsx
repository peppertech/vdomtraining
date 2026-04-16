import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "oj-c/buttonset-single";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";

type ButtonsetSingleProps = ComponentProps<"oj-c-buttonset-single">;
type ButtonsetSingleItem = NonNullable<ButtonsetSingleProps["items"]>[number];
type ButtonsetSingleValueChangedEvent = Parameters<
  NonNullable<ButtonsetSingleProps["onvalueChanged"]>
>[0];

const createStartIcon = (iconClass: string) => ({
  type: "class" as const,
  class: `oj-button-icon oj-start ${iconClass}`,
});

const formatItems: ButtonsetSingleItem[] = [
  { value: "bold", label: "Bold" },
  { value: "italic", label: "Italic" },
  { value: "underline", label: "Underline" },
];

const iconFormatItems: ButtonsetSingleItem[] = [
  { value: "bold", label: "Bold", startIcon: createStartIcon("oj-ux-ico-bold") },
  { value: "italic", label: "Italic", startIcon: createStartIcon("oj-ux-ico-italic") },
  { value: "underline", label: "Underline", startIcon: createStartIcon("oj-ux-ico-underline") },
];

const navigationItems: ButtonsetSingleItem[] = [
  { value: "home", label: "Home", startIcon: createStartIcon("oj-ux-ico-home") },
  { value: "library", label: "Library", startIcon: createStartIcon("oj-ux-ico-library") },
  { value: "applications", label: "Applications", startIcon: createStartIcon("oj-ux-ico-apps") },
];

const drinkOptions: ButtonsetSingleItem[] = [
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "juice", label: "Juice" },
];

const ButtonsetSingle = () => {
  const [textValue, setTextValue] = useState("bold");
  const [iconOnlyValue, setIconOnlyValue] = useState("bold");
  const [iconLabelValue, setIconLabelValue] = useState("bold");
  const [borderlessValue, setBorderlessValue] = useState("bold");
  const [outlinedValue, setOutlinedValue] = useState("bold");
  const [sizeSmValue, setSizeSmValue] = useState("bold");
  const [sizeDefaultValue, setSizeDefaultValue] = useState("bold");
  const [sizeMdValue, setSizeMdValue] = useState("bold");
  const [sizeLgValue, setSizeLgValue] = useState("bold");
  const [autoWidthValue, setAutoWidthValue] = useState("bold");
  const [equalWidthValue, setEqualWidthValue] = useState("bold");
  const [responsiveValue, setResponsiveValue] = useState("home");
  const [labelledValue, setLabelledValue] = useState("coffee");

  const handleValueChange =
    (setter: (value: string) => void, fallback: string) =>
    (event: ButtonsetSingleValueChangedEvent) => {
      setter(event.detail.value ?? fallback);
    };

  return (
    <div id="buttons-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Text Buttonset</h6>
      <div class="oj-sm-padding-2x">
        <oj-c-buttonset-single
          id="buttonset1"
          display="label"
          items={formatItems}
          value={textValue}
          aria-label="Choose only one format."
          onvalueChanged={handleValueChange(setTextValue, "bold")}
        ></oj-c-buttonset-single>
      </div>

      <h6>Icon Buttonset</h6>
      <div class="oj-sm-padding-2x">
        <oj-c-buttonset-single
          id="icon_buttonset1"
          display="icons"
          items={iconFormatItems}
          value={iconOnlyValue}
          aria-label="Choose only one format."
          onvalueChanged={handleValueChange(setIconOnlyValue, "bold")}
        ></oj-c-buttonset-single>
        <oj-c-buttonset-single
          id="icon_buttonset2"
          display="all"
          items={iconFormatItems}
          value={iconLabelValue}
          aria-label="Choose only one format."
          onvalueChanged={handleValueChange(setIconLabelValue, "bold")}
          class="oj-sm-margin-2x-start"
        ></oj-c-buttonset-single>
      </div>

      <h6>Disabled Buttonset</h6>
      <div class="oj-sm-padding-2x">
        <oj-c-buttonset-single
          id="dis_buttonset1"
          display="label"
          disabled
          value="bold"
          items={formatItems}
          aria-label="Choose only one format."
        ></oj-c-buttonset-single>
        <oj-c-buttonset-single
          id="dis_buttonset2"
          display="icons"
          disabled
          value="bold"
          items={iconFormatItems}
          aria-label="Choose only one format."
          class="oj-sm-margin-2x-start"
        ></oj-c-buttonset-single>
        <oj-c-buttonset-single
          id="dis_buttonset3"
          display="all"
          disabled
          value="bold"
          items={iconFormatItems}
          aria-label="Choose only one format."
          class="oj-sm-margin-2x-start"
        ></oj-c-buttonset-single>
      </div>

      <h6>Chroming</h6>
      <div class="oj-sm-padding-2x">
        <table class="oj-table-stretch">
          <thead>
            <tr>
              <th scope="col">Borderless</th>
              <th scope="col">Outlined</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <oj-c-buttonset-single
                  id="chroming_buttonset1"
                  display="icons"
                  chroming="borderless"
                  value={borderlessValue}
                  items={iconFormatItems}
                  aria-label="Choose only one format."
                  onvalueChanged={handleValueChange(setBorderlessValue, "bold")}
                ></oj-c-buttonset-single>
              </td>
              <td>
                <oj-c-buttonset-single
                  id="chroming_buttonset2"
                  display="icons"
                  chroming="outlined"
                  value={outlinedValue}
                  items={iconFormatItems}
                  aria-label="Choose only one format."
                  onvalueChanged={handleValueChange(setOutlinedValue, "bold")}
                ></oj-c-buttonset-single>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h6>Sizes</h6>
      <div class="oj-sm-padding-2x">
        <table class="oj-table-stretch">
          <thead>
            <tr>
              <th scope="col">Small</th>
              <th scope="col">Default</th>
              <th scope="col">Medium</th>
              <th scope="col">Large</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <oj-c-buttonset-single
                  id="size_buttonset1"
                  display="icons"
                  size="sm"
                  items={iconFormatItems}
                  value={sizeSmValue}
                  aria-label="Choose only one format."
                  onvalueChanged={handleValueChange(setSizeSmValue, "bold")}
                ></oj-c-buttonset-single>
              </td>
              <td>
                <oj-c-buttonset-single
                  id="size_buttonset2"
                  display="icons"
                  items={iconFormatItems}
                  value={sizeDefaultValue}
                  aria-label="Choose only one format."
                  onvalueChanged={handleValueChange(setSizeDefaultValue, "bold")}
                ></oj-c-buttonset-single>
              </td>
              <td>
                <oj-c-buttonset-single
                  id="size_buttonset3"
                  display="icons"
                  size="md"
                  items={iconFormatItems}
                  value={sizeMdValue}
                  aria-label="Choose only one format."
                  onvalueChanged={handleValueChange(setSizeMdValue, "bold")}
                ></oj-c-buttonset-single>
              </td>
              <td>
                <oj-c-buttonset-single
                  id="size_buttonset4"
                  display="icons"
                  size="lg"
                  items={iconFormatItems}
                  value={sizeLgValue}
                  aria-label="Choose only one format."
                  onvalueChanged={handleValueChange(setSizeLgValue, "bold")}
                ></oj-c-buttonset-single>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h6>Buttonset Width</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with layoutWidth="auto" which should be used when buttons need to size to their
            content.
          </p>
        </div>
        <div class="oj-sm-padding-2x">
          <oj-c-buttonset-single
            id="formatsetWidth1"
            display="label"
            value={autoWidthValue}
            items={formatItems}
            aria-label="Choose only one format."
            layoutWidth="auto"
            onvalueChanged={handleValueChange(setAutoWidthValue, "bold")}
          ></oj-c-buttonset-single>
        </div>
      </div>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with layoutWidth="equal" which should be used to make all buttons the same width.
          </p>
        </div>
        <div class="oj-sm-padding-2x">
          <oj-c-buttonset-single
            id="formatsetWidth2"
            display="label"
            value={equalWidthValue}
            layoutWidth="equal"
            items={formatItems}
            aria-label="Choose only one format."
            onvalueChanged={handleValueChange(setEqualWidthValue, "bold")}
          ></oj-c-buttonset-single>
        </div>
      </div>

      <h6>Responsive</h6>
      <div class="oj-sm-margin-6x-bottom oj-sm-padding-2x">
        <oj-c-buttonset-single
          id="itemset"
          layoutWidth="auto"
          value={responsiveValue}
          items={navigationItems}
          display="all"
          aria-label="Choose only one item."
          onvalueChanged={handleValueChange(setResponsiveValue, "home")}
        ></oj-c-buttonset-single>
      </div>

      <h6>Labelled Buttonset</h6>
      <oj-label-value label-edge="top">
        <oj-label slot="label" id="mainlabelid">
          Drinks
        </oj-label>
        <oj-c-buttonset-single
          slot="value"
          id="buttonsetLabelDemoId"
          items={drinkOptions}
          aria-labelledby="mainlabelid"
          value={labelledValue}
          aria-label="Choose only one drink."
          onvalueChanged={handleValueChange(setLabelledValue, "coffee")}
        ></oj-c-buttonset-single>
      </oj-label-value>
    </div>
  );
};

export default ButtonsetSingle;
