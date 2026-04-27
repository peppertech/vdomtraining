import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import CheckboxHome from "./checkbox/home";
import ColorPalette from "./colorPalette/index";
import ColorSpectrum from "./colorSpectrum/index";
import InputDateTimeHome from "./Inputdatetime/home";
import InputNumberHome from "./inputnumber/home";
import InputPasswordHome from "./inputpassword/home";
import InputSensitiveText from "./inputSensitiveText/index";
import InputTextHome from "./inputtext/home";
import LabelledLink from "./labelledLink/index";
import SelectAndComboboxHome from "./selectandcomobobox/home";
import SliderHome from "./slider/home";
import SwitchExample from "./switch/index";
import TextAreaHome from "./textarea/home";
import UserAssistance from "./userAssistance/index";
import ValidationHome from "./validation/home";
import RadiosetHome from "./radioset/home";
import FormLayoutHome from "./formLayout/home";
import {
  FormBreadcrumb,
  type FormBreadcrumbItem,
  type NestedFormHomeProps,
  formatCorePackLabel,
} from "./form-breadcrumb";
import InputSearchDemoWrapper from "./input-search/index";

type FormShowcase = {
  id: string;
  name: string;
  image: string;
  isCorePack?: boolean;
  render: (props?: NestedFormHomeProps) => h.JSX.Element | null;
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
    render: (props) => <RadiosetHome {...props} />,
  },
  {
    id: "checkboxes",
    name: "Checkboxes",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    isCorePack: true,
    render: (props) => <CheckboxHome {...props} />,
  },
  {
    id: "date-time",
    name: "Date & Time Inputs",
    image: "oj-ux-icon-size-12x oj-ux-ico-calendar-clock",
    isCorePack: true,
    render: (props) => <InputDateTimeHome {...props} />,
  },
  {
    id: "input-number",
    name: "Input Number",
    image: "oj-ux-icon-size-12x oj-ux-ico-input-number",
    isCorePack: true,
    render: (props) => <InputNumberHome {...props} />,
  },
  {
    id: "input-password",
    name: "Input Password",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input-password",
    isCorePack: true,
    render: (props) => <InputPasswordHome {...props} />,
  },
  {
    id: "input-sensitive-text",
    name: "Input Sensitive Text",
    image: "oj-ux-icon-size-12x oj-ux-ico-text",
    isCorePack: true,
    render: () => <InputSensitiveText />,
  },
  {
    id: "input-text",
    name: "Input Text",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input",
     isCorePack: true,
    render: (props) => <InputTextHome {...props} />,
  },
  {
    id: "text-area",
    name: "Text Area",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input-area",
     isCorePack: true,
    render: (props) => <TextAreaHome {...props} />,
  },
  {
    id: "selects-combobox",
    name: "Select & Combobox",
    image: "oj-ux-icon-size-12x oj-ux-ico-select-tab",
    isCorePack: true,
    render: (props) => <SelectAndComboboxHome {...props} />,
  },
  
  {
    id: "form-layout",
    name: "Form Layout",
    image: "oj-ux-icon-size-12x oj-ux-ico-form-layout-jet",
    isCorePack: true,
    render: (props) => <FormLayoutHome {...props} />,
  },
  {
    id: "input-search",
    name: "Input Search",
    image: "oj-ux-icon-size-12x oj-ux-ico-input-search",
    render: () => <InputSearchDemoWrapper />,
  },
  {
    id: "slider",
    name: "Slider",
    image: "oj-ux-icon-size-12x oj-ux-ico-slider",
    render: (props) => <SliderHome {...props} />,
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
    image: "oj-ux-icon-size-12x  oj-ux-ico-validation",
    render: (props) => <ValidationHome {...props} />,
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
  const [nestedBreadcrumbItems, setNestedBreadcrumbItems] = useState<
    FormBreadcrumbItem[] | null
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

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setNestedBreadcrumbItems(null);
    setSelectedItems(
      new KeySetImpl<FormShowcase["id"]>([]) as KeySet<FormShowcase["id"]>,
    );
  }, []);

  const ComponentDetail = useCallback(() => {
    const showcase = formExamples.find(
      (example) => example.id === activeComponentId,
    );
    return (
      showcase?.render({
        onBreadcrumbChange: setNestedBreadcrumbItems,
        onNavigateFormsHome: handleHomeNavigation,
      }) ?? null
    );
  }, [activeComponentId, handleHomeNavigation]);

  const activeComponent = formExamples.find(
    (example) => example.id === activeComponentId,
  );
  const activeBreadcrumbLabel = activeComponent
    ? formatCorePackLabel(activeComponent.name, activeComponent.isCorePack)
    : "Component";

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
      setNestedBreadcrumbItems(null);
    }
  };

  const breadcrumbItems: FormBreadcrumbItem[] = nestedBreadcrumbItems ?? [
    {
      label: "Forms",
      onSelect: handleHomeNavigation,
    },
    {
      label: activeBreadcrumbLabel,
      current: true,
    },
  ];

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
              <FormBreadcrumb items={breadcrumbItems} />
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
