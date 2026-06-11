import { h } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import "ojs/ojtoolbar";
import "ojs/ojmenu";
import "ojs/ojbutton";
import "ojs/ojnavigationlist";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { ojNavigationList } from "ojs/ojnavigationlist";
import type { AppRoute } from "./app";

type Props = Readonly<{
  appName: string;
  userLogin: string;
  routes: AppRoute[];
}>;

export const Header = (props: Props) => {
  const location = useLocation();
  const navigationListRef = useRef<HTMLElement | null>(null);
  const mediaQueryRef = useRef<MediaQueryList>(
    window.matchMedia(ResponsiveUtils.getFrameworkQuery("sm-only")!)
  );

  const [isSmallWidth, setIsSmallWidth] = useState(
    mediaQueryRef.current.matches
  );

  useEffect(() => {
    mediaQueryRef.current.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQueryRef.current.removeEventListener(
        "change",
        handleMediaQueryChange
      );
  }, [mediaQueryRef]);

  const handleMediaQueryChange = (e: MediaQueryListEvent) => {
    setIsSmallWidth(e.matches);
  };

  const getDisplayType = () => {
    return isSmallWidth ? "icons" : "all";
  };

  const routesDP = useMemo(
    () =>
      new ArrayDataProvider<AppRoute["path"], AppRoute>(props.routes, {
        keyAttributes: "path",
      }),
    [props.routes],
  );

  const selectedPage = location.path.startsWith("/examples")
    ? "/examples"
    : props.routes.find((route) => route.path === location.path)?.path ??
      "/bindings";

  const getRouteTarget = (path: AppRoute["path"]) =>
    path === "/examples" ? "/examples/collection" : path;

  const routeTo = (path: AppRoute["path"]) => {
    const targetPath = getRouteTarget(path);

    if (location.path !== targetPath) {
      location.route(targetPath);
    }
  };

  useEffect(() => {
    const navigationList = navigationListRef.current;

    if (!navigationList) {
      return;
    }

    const handleNavigationClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest(
        "a[data-route-path]",
      ) as HTMLAnchorElement | null;
      const routePath = anchor?.dataset.routePath as AppRoute["path"] | undefined;

      if (!anchor || !routePath || !navigationList.contains(anchor)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      routeTo(routePath);
    };

    navigationList.addEventListener("click", handleNavigationClick, true);

    return () => {
      navigationList.removeEventListener("click", handleNavigationClick, true);
    };
  }, [location.path]);

  const pageChangeHandler = (
    event: ojNavigationList.selectionChanged<AppRoute["path"], AppRoute>
  ) => {
    if (event.detail.updatedFrom === "internal") {
      routeTo(event.detail.value);
    }
  };

  const renderNavList = (
    item: ojNavigationList.ItemContext<AppRoute["path"], AppRoute>
  ) => {
    return (
      <li id={item.data.path}>
        <a
          href="#"
          data-route-path={item.data.path}
        >
          <span class={item.data.detail.iconClass} />
          {getDisplayType() === "all" ? item.data.detail.label : ""}
        </a>
      </li>
    );
  };

  return (
    <header role="banner" class="oj-web-applayout-header">
      <div class="oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center">
        <div class="oj-flex-bar-middle oj-sm-align-items-baseline">
          <span
            role="img"
            class="oj-icon demo-oracle-icon"
            title="Oracle Logo"
            aria-label="Oracle Logo"
          ></span>
          <h1
            class="oj-sm-only-hide oj-web-applayout-header-title"
            title="Virtual DOM Training Application"
          >
            {props.appName}
          </h1>
        </div>
        <div class="oj-flex-bar-end">
          <div
            role="navigation"
            class="oj-web-applayout-max-width oj-web-applayout-navbar"
          >
            <oj-navigation-list
              ref={navigationListRef}
              selection={selectedPage}
              edge="top"
              id="navilist1"
              aria-label="Main navigation, select a page"
              onselectionChanged={pageChangeHandler}
              drillMode="none"
              data={routesDP}
            >
              <template slot="itemTemplate" render={renderNavList} />
            </oj-navigation-list>
          </div>
        </div>
      </div>
    </header>
  );
};
