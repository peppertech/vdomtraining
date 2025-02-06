import { Header } from "./header";
import Footer from "./footer";
import Content from "./content/index";
import { registerCustomElement } from "ojs/ojvcomponent";
import "preact";
import { useEffect, useState } from "preact/hooks";
import CoreRouter = require("ojs/ojcorerouter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");
import Context = require("ojs/ojcontext");

type Props = {
  appName: string;
  userLogin: string;
};

type Route = {
  path: string;
  detail?: object;
  redirect?: string;
};

const routeArray: Array<Route> = [
  { path: "", redirect: "bindings" },
  {
    path: "bindings",
    detail: {
      label: "Bindings",
      iconClass: "oj-navigationlist-item-icon oj-ux-ico-binding-control",
    },
  },
  {
    path: "modules",
    detail: {
      label: "Modules",
      iconClass: "oj-navigationlist-item-icon oj-ux-ico-ungroup",
    },
  },
  {
    path: "examples",
    detail: {
      label: "Examples",
      iconClass:
        "oj-navigationlist-item-icon oj-ux-ico-instructor-training-plus",
    },
  },
];

// const router = new CoreRouter<CoreRouter.DetailedRouteConfig>(routeArray);
const router = new CoreRouter<CoreRouter.DetailedRouteConfig>(routeArray, {
  urlAdapter: new UrlParamAdapter(),
});

const pageChangeHandler = (value: string) => {
  router.go({ path: value });
};
export const App = registerCustomElement("app-root", (props: Props) => {
  props.appName = "VDOM Training";
  props.userLogin = "some.person@oracle.com";
  const [routePath, setRoutePath] = useState<string>("");

  useEffect(() => {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
    router.currentState.subscribe(routerUpdated);
    router.sync();

    // Intro of a potential keyboard info feature for Accessibility discoverability.
    document.addEventListener("keyup", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "?") {
        
        // If Ctrl/Shift/? is pressed get the currently active element.
        // this will allow us to lookup that elements keyboard usage
        // and display that in the future.
        const elem = document.activeElement;
        const elemType = elem?.tagName;
        console.log(elemType + " : " + elem?.id);
      }
    });

  }, []);

  const routerUpdated = (
    actionable: CoreRouter.ActionableState<CoreRouter.DetailedRouteConfig>
  ): void => {
    // Update our state based on new router state
    const newPath = actionable.state?.path;
    setRoutePath(newPath);
  };

  return (
    <div id="appContainer" class="oj-web-applayout-page">
      <Header
        appName={props.appName}
        page={routePath}
        onPageChanged={pageChangeHandler}
        userLogin={props.userLogin}
        routes={routeArray}
      />
      <Content page={routePath} router={router} />
      <Footer />
    </div>
  );
});
