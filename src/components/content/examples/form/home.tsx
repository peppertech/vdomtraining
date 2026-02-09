import { h, ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";
import CoreRouter = require("ojs/ojcorerouter");
import KnockoutRouterAdapter = require("ojs/ojknockoutrouteradapter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");
import "ojs/ojnavigationlist";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojactioncard";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import SelectSingle from "./selectSingle";
import ComboBoxOne from "./comboBoxOne";
import InputText from "./inputText";
import FormElements from "./formelements";
import { ButtonElement } from "ojs/ojbutton";
import "ojs/ojbutton";
import SelectMultiple from "./selectMultipleCorePack";
import SelectSingleCorePack from "./selectSingleCorePack";
import InputTextCorePack from "./inputTextCorePack";
import InputNumber from "./inputNumber";
import InputNumberCorePack from "./inputNumberCorePack";
import InputDateTime from "./inputDateTime";
import TextArea from "./textArea";
import TextAreaCorePack from "./textAreaCorePack";
import CheckBoxSet from "./checkBoxSet";
import InputDate from "./inputDate";
import InputDatePicker from "./inputDatePicker";
import InputSearch from "./InputSearch";
import { JobApplicationForm } from "./jobApplicationForm";
import { InputPasswordCorePack } from "./inputPasswordCorePack";
import { FormLayoutCorePack } from "./formLayoutCorePack";
import { SelectMany } from "./selectMany";
import { SwitchExample } from "./switch";
import { Slider } from "./slider";
import { ComboboxMany } from "./comboboxMany";
import { InputDateMask } from "./inputDateMask";
import { InputDateText } from "./inputDateText";


type JETComponent = {
  id: number;
  name: string;
  image: string;
  isAvailable?: boolean;
  isCorePack?: boolean;
};

const allFormsComponents = [
  {
    id: 1,
    name: "Checkbox",
    image: "oj-ux-icon-size-12x  oj-ux-ico-checkbox-on",
    isAvailable: true,
    isCorePack: false,
  },
  // {
  //   id: 2,
  //   name: "Color Palette",
  //   image: "oj-ux-icon-size-12x  oj-ux-ico-color-palette",
  //   isAvailable: true,
  //   isCorePack: false,
  // },
  // {
  //   id: 3,
  //   name: "Color Spectrum",
  //   image: "oj-ux-icon-size-12x  oj-ux-ico-color-spectrum",
  //   isAvailable: true,
  //   isCorePack: false,
  // },
  {
    id: 4,
    name: "Form Layout",
    image: "oj-ux-icon-size-12x  oj-ux-ico-form-layout-jet",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 5,
    name: "Input Date Time",
    image: "oj-ux-icon-size-12x  oj-ux-ico-calendar-clock",
    isAvailable: true,
    isCorePack: false,
  },
  {
    id: 6,
    name: "Input Date",
    image: "oj-ux-icon-size-12x  oj-ux-ico-date-range-input",
    isAvailable: true,
    isCorePack: false,
  },
  {
    id: 7,
    name: "Date Picker",
    image: "oj-ux-icon-size-12x  oj-ux-ico-date-range-input",
    isAvailable: true,
    isCorePack: false,
  },
  // {
  //   id: 8,
  //   name: "Date Time",
  //   image: "oj-ux-icon-size-12x  oj-ux-ico-calendar",
  //   isAvailable: true,
  //   isCorePack: false,
  // },
  // {
  //   id: 9,
  //   name: "Input Time",
  //   image: "oj-ux-icon-size-12x  oj-ux-ico-calendar",
  //   isAvailable: true,
  //   isCorePack: false,
  // },
  {
    id: 10,
    name: "Input Number",
    image: "oj-ux-icon-size-12x  oj-ux-ico-input-number",
    isAvailable: true,
    isCorePack: false,
  },

  {
    id: 11,
    name: "Input Password",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input-password",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 12,
    name: "Input Search",
    image: "oj-ux-icon-size-12x  oj-ux-ico-input-search",
    isAvailable: true,
    isCorePack: false,
  },
  {
    id: 13,
    name: "Input Text",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input",
    isAvailable: true,
    isCorePack: false,
  },

  {
    id: 14,
    name: "Text Area",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input-area",
    isAvailable: true,
    isCorePack: false,
  },

  {
    id: 15,
    name: "Select Single",
    image: "oj-ux-icon-size-12x  oj-ux-ico-select-tab",
    isAvailable: true,
    isCorePack: false,
  },
  {
    id: 16,
    name: "Slider",
    image: "oj-ux-icon-size-12x  oj-ux-ico-slider",
    isAvailable: true,
    isCorePack: false,
  },
  {
    id: 17,
    name: "Switch",
    image: "oj-ux-icon-size-12x  oj-ux-ico-switch-on",
    isAvailable: true,
    isCorePack: false,
  },

  {
    id: 18,
    name: "Select Many",
    image: "oj-ux-icon-size-12x  oj-ux-ico-select-all",
    isAvailable: true,
    isCorePack: false,
  },
  {
    id: 19,
    name: "Combobox One",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input-combo",
    isAvailable: true,
    isCorePack: false,
  },

  {
    id: 20,
    name: "Combobox Many",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input-combo-many",
    isAvailable: true,
    isCorePack: false,
  },
  // {
  //   id: 21,
  //   name: "User Assistance",
  //   image: "oj-ux-icon-size-12x  oj-ux-ico-user-assistance",
  //   isAvailable: false,
  //   isCorePack: false,
  // },
  // {
  //   id: 22,
  //   name: "Validation",
  //   image: "oj-ux-icon-size-12x  oj-ux-ico-user-assistance",
  //   isAvailable: false,
  //   isCorePack: false,
  // },

  {
    id: 23,
    name: "Input Number",
    image: "oj-ux-icon-size-12x  oj-ux-ico-input-number",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 24,
    name: "Input Text",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input",
    isAvailable: true,
    isCorePack: true,
  },

  {
    id: 25,
    name: "Select Multiple",
    image: "oj-ux-icon-size-12x  oj-ux-ico-select",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 26,
    name: "Select Single",
    image: "oj-ux-icon-size-12x  oj-ux-ico-select-tab",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 27,
    name: "Text Area",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input-area",
    isAvailable: true,
    isCorePack: true,
  },

  {
    id: 28,
    name: "Input Date Mask",
    image: "oj-ux-icon-size-12x  oj-ux-ico-masked-text-input",
    isAvailable: true,
    isCorePack: true,
  },
  {
    id: 29,
    name: "Input Date Text",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input",
    isAvailable: true,
    isCorePack: true,
  },
  // {
  //   id: 30,
  //   name: "Input Month Mask",
  //   image: "oj-ux-icon-size-12x  oj-ux-ico-masked-text-input",
  //   isAvailable: true,
  //   isCorePack: true,
  // },
  // {
  //   id: 31,
  //   name: "Input Sensitive Text",
  //   image: "oj-ux-icon-size-12x  oj-ux-ico-text-input-password",
  //   isAvailable: true,
  //   isCorePack: true,
  // },
  {
    id: 32,
    name: "Job Application Form",
    image: "oj-ux-icon-size-12x  oj-ux-ico-form-layout-jet",
    isAvailable: true,
    isCorePack: false,
  },
];

const dataProvider = new MutableArrayDataProvider<
  JETComponent["id"],
  JETComponent
>(allFormsComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const INIT_SELECTEDITEMS = new KeySetImpl([]) as KeySet<JETComponent["id"]>;

const FormsHome = () => {
  const [selectedItems, setselectedItems] =
    useState<KeySet<JETComponent["id"]>>(INIT_SELECTEDITEMS);
  const [showComponentDetail, setComponentDetailVal] = useState(false);
  const [activeTab, setActiveTab] = useState<Number>(0);
  const [isComponentAvailable, setComponentAvvailability] = useState(false);

  let ComponentDetail = () => {
    switch (activeTab) {//
      case 1:
        return <CheckBoxSet />;
      case 4:
        return <FormLayoutCorePack />;
      case 5:
        return <InputDateTime />;
      case 6:
        return <InputDate />;
      case 7:
        return <InputDatePicker />;
      case 10:
        return <InputNumber />;
      case 11:
        return <InputPasswordCorePack />;  
      case 12:
        return <InputSearch />;
      case 15:
        return <SelectSingle />;
        case 16:
        return <Slider />;
      case 13:
        return <InputText />;
      case 14:
        return <TextArea />;
      case 17:
        return <SwitchExample/>;
      case 18:
        return <SelectMany />;
      case 19:
        return <ComboBoxOne />; 
      case 23:
        return <InputNumberCorePack />;
      case 20:
        return <ComboboxMany/>;
      case 24:
        return <InputTextCorePack />;
      case 25:
        return <SelectMultiple />;
      case 26:
        return <SelectSingleCorePack />;
      case 27:
        return <TextAreaCorePack />;
       case 28:
        return <InputDateMask />;  
       case 29:
        return <InputDateText />;    
      case 32:
        return <JobApplicationForm />;
      default:
        return <FormsHome />;
    }
  };

  const handleOjAction = (event: ButtonElement.ojAction) => {
    //const label = event.detail.originalEvent.currentTarget.innerText;
    setActiveTab(0);
    setComponentDetailVal(false);
    //console.log("Button clicked: ", label ? label : "Icon Only");
  };

  const handleSelectedChanged = (event: any) => {
    setActiveTab(event.detail.items[0]["key"]);
    setselectedItems(event.detail.value);
    setComponentDetailVal(true);
    //console.log(event.detail.items[0].innerText);
    let filteredComponent = allFormsComponents.filter(
      (component) => component.id === event.detail.items[0].key
    );
    let flag = filteredComponent[0].isAvailable;
    setComponentAvvailability(flag);
    // console.log(isComponentAvailable);
  };
  // <div class="comingsoon">Coming soon....</div>
  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<JETComponent["id"], JETComponent>
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
                <div class="oj-flex-item  oj-text-sm componentInfo oj-typography-body-md oj-typography-bold">
                  {item.data.name}
                </div>
              </div>
            </div>
          </oj-action-card>
        </li>
      );
    },
    [selectedItems]
  );
  return (
    <div class="component-wrapper">
      {!showComponentDetail ? (
        <oj-list-view
          id="listview"
          aria-label="list of employees"
          data={dataProvider}
          onselectedChanged={handleSelectedChanged}
          selectionMode={"single"}
          selected={selectedItems}
          display={"card"}
          class="listview-sizing"
        >
          <template slot="itemTemplate" render={renderListItem}></template>
        </oj-list-view>
      ) : (
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
          <oj-button label=" << Home " onojAction={handleOjAction} />
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

export default FormsHome;
