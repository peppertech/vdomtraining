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
import { ActionCardElement } from "ojs/ojactioncard";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import SelectSingle from "./selectSingle";
import ComboBox from "./combobox";
import InputText from "./inputtext";
import FormElements from "./formelements";
import { ButtonElement } from "ojs/ojbutton";
import "ojs/ojbutton";

type JETComponent = {
  id: number;
  name: string;
  image: string;
  isAvailable?: boolean;
};
const allFormsComponents = [
  {
    id: 1,
    name: "Checkbox",
    image: "oj-ux-icon-size-12x  oj-ux-ico-checkbox-on",
    isAvailable: false,
  },
  {
    id: 2,
    name: "Color palette",
    image: "oj-ux-icon-size-12x  oj-ux-ico-color-palette",
    isAvailable: false,
  },
  {
    id: 3,
    name: "color Spectrum",
    image: "oj-ux-icon-size-12x  oj-ux-ico-color-spectrum",
    isAvailable: false,
  },
  {
    id: 4,
    name: "Form Layout",
    image: "oj-ux-icon-size-12x  oj-ux-ico-form-layout-jet",
    isAvailable: false,
  },
  {
    id: 5,
    name: "Input Date Time",
    image: "oj-ux-icon-size-12x  oj-ux-ico-calendar-clock",
    isAvailable: false,
  },
  {
    id: 6,
    name: "Input Number",
    image: "oj-ux-icon-size-12x  oj-ux-ico-input-number",
    isAvailable: false,
  },
  {
    id: 7,
    name: "Input Password",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input-password",
    isAvailable: false,
  },
  {
    id: 8,
    name: "Input Search",
    image: "oj-ux-icon-size-12x  oj-ux-ico-input-search",
    isAvailable: false,
  },
  {
    id: 9,
    name: "Input Text",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input",
    isAvailable: true,
  },
  {
    id: 10,
    name: "Text Area",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input-area",
    isAvailable: false,
  },
  {
    id: 11,
    name: "Select Single",
    image: "oj-ux-icon-size-12x  oj-ux-ico-select-tab",
    isAvailable: true,
  },
  {
    id: 12,
    name: "RadioSet",
    image: "oj-ux-icon-size-12x  oj-ux-ico-radio-set",
    isAvailable: false,
  },
  {
    id: 13,
    name: "User Assistance",
    image: "oj-ux-icon-size-12x  oj-ux-ico-user-assistance",
    isAvailable: false,
  },
  {
    id: 14,
    name: "Combobox",
    image: "oj-ux-icon-size-12x  oj-ux-ico-text-input-combo",
    isAvailable: true,
  },
  {
    id: 15,
    name: "Job Application Form",
    image: "oj-ux-icon-size-12x  oj-ux-ico-form-layout-jet",
    isAvailable: true,
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
  const [selectedItems, setselectedItems] = useState<
    KeySet<JETComponent["id"]>
  >(INIT_SELECTEDITEMS);
  const [showComponentDetail, setComponentDetailVal] = useState(false);
  const [activeTab, setActiveTab] = useState<Number>(0);
  const [isComponentAvailable, setComponentAvvailability] = useState(false);

  let ComponentDetail = () => {
    switch (activeTab) {
      case 11:
        return <SelectSingle />;
      case 14:
        return <ComboBox />;
      case 15:
        return <FormElements />;
      case 9:
        return <InputText />;
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
      (component) => component.name === event.detail.items[0].innerText
    );
    let flag = filteredComponent[0].isAvailable;
    setComponentAvvailability(flag);
    console.log(isComponentAvailable);
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
              <div style={{ paddingTop: "25px" }} class="componentImage">
                <div class="oj-helper-text-align-center">
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
            { ComponentDetail(); }
          ) : (
            <div class="comingsoon">Coming soon....</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormsHome;
