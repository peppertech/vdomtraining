import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { ojTabBar } from "ojs/ojnavigationlist";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import FormElements from "./formelements";
//import Color = require("@oracle/oraclejet/dist/types/ojcolor");
//import JobApplicationForm from "./jobapplicationform";
import SelectSingle from "./selectSingle";
import FormsHome from "./home";
import ComboBox from "./combobox";
import InputText from "./inputtext";
// style={{ fontWeight: 400 , backgroundColor: "gray"}}>

type Tab = {
  value: string;
  label: string;
  icon?: string;
};

const FormControls = () => {
  const [activeTab, setActiveTab] = useState<string>("collection");
  const tabs = [
    { value: "homepage", label: "Home Page" },
    { value: "selectsingle", label: "Select Single" },
    { value: "inputtext", label: "Input Text" },
    { value: "combobox", label: "Combo Box" },
    { value: "formelements", label: "Job Application Form" },
  ];

  const tabbarDP = new MutableArrayDataProvider<Tab["value"], Tab>(tabs, {
    keyAttributes: "value",
  });

  const loadTabContent = (
    event: ojTabBar.selectionChanged<Tab["value"], Tab>
  ) => {
    setActiveTab(event.detail.value);
  };

  let pageContent = () => {
    switch (activeTab) {
      case "homepage":
        return <FormsHome />;
      case "selectsingle":
        return <SelectSingle />;
      case "inputtext":
        return <InputText />;
      case "formelements":
        return <FormElements />;
      case "combobox":
        return <ComboBox />;
      default:
        return <FormsHome />;
    }
  };

  const tabItemTemplate = (item: ojTabBar.ItemContext<Tab["value"], Tab>) => {
    return (
      <li>
        <a href="#">
          <span>{item.data.label} </span>
        </a>
      </li>
    );
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <hr />
      <oj-tab-bar
        edge="top"
        data={tabbarDP}
        selection={activeTab}
        onselectionChanged={loadTabContent}
      >
        <template slot="itemTemplate" render={tabItemTemplate}></template>
      </oj-tab-bar>

      <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-12">
        {pageContent()}
      </div>
    </div>
  );
};
export default FormControls;
