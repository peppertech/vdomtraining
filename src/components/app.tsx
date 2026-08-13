import { registerCustomElement } from "ojs/ojvcomponent";
import "preact";
import { LocationProvider } from "preact-iso";
import { useCallback, useEffect, useState } from "preact/hooks";
import { RootEnvironmentProvider } from "@oracle/oraclejet-preact/UNSAFE_Environment";
import Content from "./content/index";
import { Header } from "./header";
import Context = require("ojs/ojcontext");

type Props = {
  appName?: string;
  userLogin?: string;
};

export type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "vdom-training.theme-mode";

const getStoredThemeMode = (): ThemeMode => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
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
  const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredThemeMode);

  const changeThemeMode = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
  }, []);

  useEffect(() => {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }, []);

  useEffect(() => {
    const isDark = themeMode === "dark";
    const body = document.body;

    body.classList.toggle("app-theme--dark", isDark);
    body.classList.toggle("oj-color-invert", isDark);
    body.classList.toggle("oj-c-colorscheme-dark", isDark);
    body.classList.toggle("oj-bg-neutral-170", isDark);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // The application remains usable when browser storage is unavailable.
    }
  }, [themeMode]);

  return (
    <RootEnvironmentProvider environment={{ colorScheme: themeMode }}>
      <LocationProvider>
        <div id="appContainer" class="oj-web-applayout-page">
          <Header
            appName={appName}
            userLogin={userLogin}
            routes={routeArray}
            themeMode={themeMode}
            onThemeModeChanged={changeThemeMode}
          />

          <Content />
        </div>
      </LocationProvider>
    </RootEnvironmentProvider>
  );
});
