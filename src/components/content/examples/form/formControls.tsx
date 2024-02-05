import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { ojTabBar } from "ojs/ojnavigationlist";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import FormElements from "./formelements";
import Color = require("@oracle/oraclejet/dist/types/ojcolor");
import JobApplicationForm from "./jobapplicationform";
import SelectSingle from "./selectSingle";
// style={{ fontWeight: 400 , backgroundColor: "gray"}}>

type Tab = {
  value: string;
  label: string;
  icon?: string;
};

const FormControls = () => {

const [activeTab, setActiveTab] = useState<string>("collection");
const tabs = [
     { value: "selectsingle", label: "Select & Combobox" },
   {value: 'jobapplicationform', label: "Job Application Form"},
    { value: "formelements", label: "Form Elements" }

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
        case "formelements":
        return <FormElements />;
      case "selectsingle":
        return <SelectSingle />;
        case "jobapplicationform":
          return <JobApplicationForm/>
      default:
        return <SelectSingle />;
    }
  };

  const tabItemTemplate = (item: ojTabBar.ItemContext<Tab["value"], Tab>) => {
    return (
      <li>
        <a href="#">
          <span >{item.data.label} </span>
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
        onselectionChanged={loadTabContent}>
        <template slot="itemTemplate" render={tabItemTemplate}></template>
      </oj-tab-bar>
      <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
        {pageContent()}
      </div>
    </div>
  );
};
export default FormControls;