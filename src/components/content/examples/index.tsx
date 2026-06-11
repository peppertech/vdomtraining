import Collection from "./collection/index";
import Form from "./form/index";
import DataViz from "./dataviz/index";
import Control from "./control/index";
import NavLayout from "./navlayout/index";
import "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { Route, Router, useLocation } from "preact-iso";
import "ojs/ojnavigationlist";
import { ojTabBar } from "ojs/ojnavigationlist";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ExampleRouteProvider } from "./example-route-context";

type Tab = {
  path: string;
  label: string;
  icon?: string;
};

type ExampleRouteKey = Tab["path"];

type RedirectProps = {
  to: string;
};

const tabBarItems: Tab[] = [
  { path: "collection", label: "Collections" },
  { path: "control", label: "Controls" },
  { path: "form", label: "Forms" },
  { path: "navlayout", label: "Layout & Nav" },
  { path: "dataviz", label: "Visualizations" },
];

const isExampleRouteKey = (value: string): value is ExampleRouteKey =>
  tabBarItems.some((item) => item.path === value);

const Redirect = ({ to }: RedirectProps) => {
  const location = useLocation();

  useEffect(() => {
    if (location.path !== to) {
      location.route(to, true);
    }
  }, [location, to]);

  return null;
};

const CollectionRoute = () => (
  <ExampleRouteProvider category="collection">
    <Collection />
  </ExampleRouteProvider>
);

const ControlRoute = () => (
  <ExampleRouteProvider category="control">
    <Control />
  </ExampleRouteProvider>
);

const FormRoute = () => (
  <ExampleRouteProvider category="form">
    <Form />
  </ExampleRouteProvider>
);

const NavLayoutRoute = () => (
  <ExampleRouteProvider category="navlayout">
    <NavLayout />
  </ExampleRouteProvider>
);

const DataVizRoute = () => (
  <ExampleRouteProvider category="dataviz">
    <DataViz />
  </ExampleRouteProvider>
);

const ExampleContent = () => {
  const location = useLocation();
  const tabBarRef = useRef<HTMLElement | null>(null);
  const activeTab =
    location.path.replace(/^\/examples\/?/, "").split("/")[0] || "collection";
  const selectedTab = isExampleRouteKey(activeTab) ? activeTab : "collection";

  const tabbarDP = useMemo(
    () =>
      new MutableArrayDataProvider<Tab["path"], Tab>(tabBarItems, {
        keyAttributes: "path",
      }),
    [],
  );

  const routeToTab = (path: Tab["path"]) => {
    const nextPath = `/examples/${path}`;

    if (location.path !== nextPath) {
      location.route(nextPath);
    }
  };

  useEffect(() => {
    const tabBar = tabBarRef.current;

    if (!tabBar) {
      return;
    }

    const handleTabClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest(
        "a[data-tab-path]",
      ) as HTMLAnchorElement | null;
      const tabPath = anchor?.dataset.tabPath as Tab["path"] | undefined;

      if (!anchor || !tabPath || !tabBar.contains(anchor)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      routeToTab(tabPath);
    };

    tabBar.addEventListener("click", handleTabClick, true);

    return () => {
      tabBar.removeEventListener("click", handleTabClick, true);
    };
  }, [location.path]);

  const loadTabContent = (
    event: ojTabBar.selectionChanged<Tab["path"], Tab>,
  ): void => {
    if (event.detail.updatedFrom === "internal") {
      routeToTab(event.detail.value);
    }
  };

  const tabItemTemplate = (item: ojTabBar.ItemContext<Tab["path"], Tab>) => {
    return (
      <li>
        <a
          href="#"
          data-tab-path={item.data.path}
        >
          <span></span>
          {item.data.label}
        </a>
      </li>
    );
  };

  return (
    <div class="oj-web-applayout-content">
      <oj-tab-bar
        ref={tabBarRef}
        edge="top"
        data={tabbarDP}
        selection={selectedTab}
        onselectionChanged={loadTabContent}
      >
        <template slot="itemTemplate" render={tabItemTemplate}></template>
      </oj-tab-bar>
      <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
        <Router>
          <Route path="/" component={Redirect} to="/examples/collection" />
          <Route path="/collection" component={CollectionRoute} />
          <Route path="/collection/*" component={CollectionRoute} />
          <Route path="/control" component={ControlRoute} />
          <Route path="/control/*" component={ControlRoute} />
          <Route path="/form" component={FormRoute} />
          <Route path="/form/*" component={FormRoute} />
          <Route path="/navlayout" component={NavLayoutRoute} />
          <Route path="/navlayout/*" component={NavLayoutRoute} />
          <Route path="/dataviz" component={DataVizRoute} />
          <Route path="/dataviz/*" component={DataVizRoute} />
          <Route default component={Redirect} to="/examples/collection" />
        </Router>
      </div>
    </div>
  );
};

export default ExampleContent;
