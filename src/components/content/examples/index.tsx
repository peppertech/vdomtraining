import Collection from "./collection/index";
import Form from "./form/index";
import DataViz from "./dataviz/index";
import Control from "./control/index";
import NavLayout from "./navlayout/index";
import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { ojTabBar } from "ojs/ojnavigationlist";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type Tab = {
  value: string;
  label: string;
  icon?: string;
};

const ExampleContent = () => {
  const [activeTab, setActiveTab] = useState<string>("collection");

  const tabs = [
    { value: "collection", label: "Collection" },
    { value: "form", label: "Form" },
    { value: "dataviz", label: "Data Visualization" },
    { value: "control", label: "Control" },
    { value: "navlayout", label: "Navigation and Layout" },
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
      case "form":
        return <Form />;
      case "collection":
        return <Collection />;
      case "dataviz":
        return <DataViz />;
      case "control":
        return <Control />;
      case "navlayout":
        return <NavLayout />;
      default:
        return <Collection />;
    }
  };

  const tabItemTemplate = (item: ojTabBar.ItemContext<Tab["value"], Tab>) => {
    return (
      <li>
        <a href="#">
          <span></span>
          {item.data.label}
        </a>
      </li>
    );
  };
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h1 class="oj-typography-heading-lg"> Examples </h1>
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
export default ExampleContent;
