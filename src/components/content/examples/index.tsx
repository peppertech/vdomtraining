import Collection from "./collection/index";
import Form from "./form/index";
import DataViz from "./dataviz/index";
import Control from "./control/index";
import NavLayout from "./navlayout/index";
import "preact";
import { useState, useEffect } from "preact/hooks";
import "ojs/ojnavigationlist";
import { ojTabBar } from "ojs/ojnavigationlist";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import CoreRouter = require("ojs/ojcorerouter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");

type Props = {
  router: CoreRouter;
};

type Tab = {
  path: string;
  label: string;
  icon?: string;
};

let exampleRouter: any = null;
const ExampleContent = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("collection");

  const tabs = [
    { path: "", redirect: "collection" },
    { path: "collection", label: "Collection", detail: {} },
    { path: "form", label: "Form", detail: {} },
    { path: "dataviz", label: "Data Visualization", detail: {} },
    { path: "control", label: "Control", detail: {} },
    { path: "navlayout", label: "Navigation and Layout", detail: {} },
  ];
  if (!props.router.childRouter) {
    exampleRouter = props.router.createChildRouter(tabs, {
      urlAdapter: new UrlParamAdapter(),
    });
  }

  useEffect(() => {
    if (exampleRouter) {
      exampleRouter.currentState.subscribe(routerUpdated);
      exampleRouter.sync();
    }
  }, []);

  const routerUpdated = (
    actionable: CoreRouter.ActionableState<CoreRouter.DetailedRouteConfig>
  ): void => {
    // Update our state based on new router state
    const newPath = actionable.state?.path;
    setActiveTab(newPath);
  };

  const tabbarDP = new MutableArrayDataProvider<Tab["path"], Tab>(
    tabs.slice(0),
    {
      keyAttributes: "path",
    }
  );
  const loadTabContent = (
    event: ojTabBar.selectionChanged<Tab["path"], Tab>
  ) => {
    setActiveTab(event.detail.value);
    exampleRouter.go({ path: event.detail.value });
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

  const tabItemTemplate = (item: ojTabBar.ItemContext<Tab["path"], Tab>) => {
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
        onselectionChanged={loadTabContent}
      >
        <template slot="itemTemplate" render={tabItemTemplate}></template>
      </oj-tab-bar>
      <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
        {pageContent()}
      </div>
    </div>
  );
};
export default ExampleContent;
