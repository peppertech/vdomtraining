import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";
import { ButtonElement } from "ojs/ojbutton";

import CheckboxHome from "./checkbox/home";
import { ColorPalette } from "./colorPalette";
import { ColorSpectrum } from "./colorSpectrum";
import InputDateTimeHome from "./Inputdatetime/home";
import InputNumberHome from "./inputnumber/home";
import InputPasswordHome from "./inputpassword/home";
import InputTextHome from "./inputtext/home";
import InputSearch from "./InputSearch";
import { LabelledLink } from "./labelledLink";
import SelectAndComboboxHome from "./selectandcomobobox/home";
import { Slider } from "./slider";
import { SwitchExample } from "./switch";
import TextAreaHome from "./textarea/home";
import { FormLayoutCorePack } from "./formLayoutCorePack";
import { UserAssistance } from "./userAssistance";
import { ValidationGroupExample } from "./validationGroup";
import { RadiosetCorePackExample } from "./radiosetCorePackExample";

type FormShowcase = {
  id: string;
  name: string;
  image: string;
  isCorePack?: boolean;
  render: () => h.JSX.Element | null;
};

const formExamples: FormShowcase[] = [
  {
    id: "color-palette",
    name: "Color Palette",
    image: "oj-ux-icon-size-12x oj-ux-ico-color-palette",
    render: () => <ColorPalette />,
  },
  {
    id: "color-spectrum",
    name: "Color Spectrum",
    image: "oj-ux-icon-size-12x oj-ux-ico-color-spectrum",
    render: () => <ColorSpectrum />,
  },
 
  {
    id: "radioset",
    name: "Radioset",
    image: "oj-ux-icon-size-12x  oj-ux-ico-radio-set",
    isCorePack: true,
    render: () => <RadiosetCorePackExample />,
  },
  {
    id: "checkboxes",
    name: "Checkboxes",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    isCorePack: true,
    render: () => <CheckboxHome />,
  },
  {
    id: "date-time",
    name: "Date & Time Inputs",
    image: "oj-ux-icon-size-12x oj-ux-ico-calendar-clock",
    isCorePack: true,
    render: () => <InputDateTimeHome />,
  },
  {
    id: "input-number",
    name: "Input Number",
    image: "oj-ux-icon-size-12x oj-ux-ico-input-number",
    isCorePack: true,
    render: () => <InputNumberHome />,
  },
  {
    id: "input-password",
    name: "Input Password",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input-password",
    isCorePack: true,
    render: () => <InputPasswordHome />,
  },
  {
    id: "input-text",
    name: "Input Text",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input",
     isCorePack: true,
    render: () => <InputTextHome />,
  },
  {
    id: "text-area",
    name: "Text Area",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input-area",
     isCorePack: true,
    render: () => <TextAreaHome />,
  },
  {
    id: "selects-combobox",
    name: "Select & Combobox",
    image: "oj-ux-icon-size-12x oj-ux-ico-select-tab",
    isCorePack: true,
    render: () => <SelectAndComboboxHome />,
  },
  
  {
    id: "form-layout",
    name: "Form Layout",
    image: "oj-ux-icon-size-12x oj-ux-ico-form-layout-jet",
    isCorePack: true,
    render: () => <FormLayoutCorePack />,
  },
  {
    id: "input-search",
    name: "Input Search",
    image: "oj-ux-icon-size-12x oj-ux-ico-input-search",
    render: () => <InputSearch />,
  },
  {
    id: "slider",
    name: "Slider",
    image: "oj-ux-icon-size-12x oj-ux-ico-slider",
    render: () => <Slider />,
  },
  {
    id: "switch",
    name: "Switch",
    image: "oj-ux-icon-size-12x oj-ux-ico-switch-on",
    render: () => <SwitchExample />,
  },
  {
    id: "user-assistance",
    name: "User Assistance",
    image: "oj-ux-icon-size-12x oj-ux-ico-user-assistance",
    render: () => <UserAssistance />,
  },
  {
    id: "validation",
    name: "Validation",
    image: "oj-ux-icon-size-12x oj-ux-ico-user-assistance",
    render: () => <ValidationGroupExample />,
  },
  {
    id: "labelled-link",
    name: "Labelled Link",
    image: "oj-ux-icon-size-12x oj-ux-ico-link",
    isCorePack: true,
    render: () => <LabelledLink />,
  },
];

const dataProvider = new MutableArrayDataProvider<
  FormShowcase["id"],
  FormShowcase
>(formExamples, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl<FormShowcase["id"]>([]) as KeySet<FormShowcase["id"]>;

const FormsHome = () => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<FormShowcase["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<
    FormShowcase["id"] | null
  >(null);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        FormShowcase["id"],
        FormShowcase
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
    const showcase = formExamples.find(
      (example) => example.id === activeComponentId,
    );
    return showcase?.render() ?? null;
  }, [activeComponentId]);

  const handleHomeNavigation = (_event: ButtonElement.ojAction) => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(
      new KeySetImpl<FormShowcase["id"]>([]) as KeySet<FormShowcase["id"]>,
    );
  };

  const handleSelectedChanged = (
    event: ojListView.selectedChanged<FormShowcase["id"], FormShowcase>,
  ) => {
    const selection = event.detail.value as KeySet<FormShowcase["id"]>;
    setSelectedItems(selection);

    const selectedKey = event.detail.items[0]?.key as
      | FormShowcase["id"]
      | undefined;

    if (selectedKey) {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
    }
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
          {!showComponentDetail ? (
            <oj-list-view
              id="forms-home-listview"
              aria-label="Form component gallery"
              class="listview-sizing"
              data={dataProvider}
              selectionMode="single"
              selected={selectedItems}
              gridlines={gridlines}
              display="card"
              onselectedChanged={handleSelectedChanged}
            >
              <template slot="itemTemplate" render={renderListItem}></template>
            </oj-list-view>
          ) : (
            <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
              <oj-button
                class="breadcrumb-wrapper"
                label=" Forms Home "
                onojAction={handleHomeNavigation}
              />
              {ComponentDetail() ?? (
                <div class="comingsoon">Coming soon....</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormsHome;
