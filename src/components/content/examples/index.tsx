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

type ExampleRoute =
  | Tab
  | {
      path: string;
      redirect: string;
    };

type ExampleRouter = CoreRouter;
type ExampleRouterState = Parameters<
  ExampleRouter["currentState"]["subscribe"]
>[0] extends (state: infer T) => void
  ? T
  : never;

let exampleRouter: ExampleRouter | null = null;
const ExampleContent = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("collection");

  const tabBarItems: Tab[] = [
    { path: "collection", label: "Collections" },
    { path: "control", label: "Controls" },
    { path: "form", label: "Forms" },
    { path: "navlayout", label: "Layout & Nav" },
    { path: "dataviz", label: "Visualizations" },
  ];
  const exampleRoutes: ExampleRoute[] = [
    { path: "", redirect: "collection" },
    ...tabBarItems,
  ];
  if (!props.router.childRouter) {
    exampleRouter = props.router.createChildRouter(exampleRoutes, {
      urlAdapter: new UrlParamAdapter(),
    });
  }

  useEffect(() => {
    if (exampleRouter) {
      exampleRouter.currentState.subscribe(routerUpdated);
      exampleRouter.sync();
    }
  }, []);

  const routerUpdated = (actionable: ExampleRouterState): void => {
    // Update our state based on new router state
    const newPath = (actionable.state as { path?: string } | undefined)?.path;
    if (typeof newPath === "string") {
      setActiveTab(newPath);
    }
  };

  const tabbarDP = new MutableArrayDataProvider<Tab["path"], Tab>(tabBarItems, {
    keyAttributes: "path",
  });
  const loadTabContent = (
    event: ojTabBar.selectionChanged<Tab["path"], Tab>,
  ): void => {
    setActiveTab(event.detail.value);
    exampleRouter?.go({ path: event.detail.value });
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
