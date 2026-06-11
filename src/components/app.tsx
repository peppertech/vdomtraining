import { Header } from "./header";
import Footer from "./footer";
import Content from "./content/index";
import { registerCustomElement } from "ojs/ojvcomponent";
import "preact";
import { useEffect } from "preact/hooks";
import { LocationProvider } from "preact-iso";
import Context = require("ojs/ojcontext");

type Props = {
  appName?: string;
  userLogin?: string;
};

export type AppRoute = {
  path: string;
  detail: {
    label: string;
    iconClass: string;
  };
};

const routeArray: AppRoute[] = [
  {
    path: "/bindings",
    detail: {
      label: "Bindings",
      iconClass: "oj-navigationlist-item-icon oj-ux-ico-binding-control",
    },
  },
  {
    path: "/modules",
    detail: {
      label: "Modules",
      iconClass: "oj-navigationlist-item-icon oj-ux-ico-ungroup",
    },
  },
  {
    path: "/examples",
    detail: {
      label: "Examples",
      iconClass:
        "oj-navigationlist-item-icon oj-ux-ico-instructor-training-plus",
    },
  },
];

export const App = registerCustomElement("app-root", (props: Props) => {
  const appName = props.appName ?? "VDOM Training";
  const userLogin = props.userLogin ?? "some.person@oracle.com";

  useEffect(() => {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }, []);

  return (
    <LocationProvider>
      <div id="appContainer" class="oj-web-applayout-page">
        <Header appName={appName} userLogin={userLogin} routes={routeArray} />

        <Content />

        <Footer />
      </div>
    </LocationProvider>
  );
});
