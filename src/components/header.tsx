import { h, type ComponentProps } from "preact";
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import "oj-c/tab-bar";
import type { TabData } from "oj-c/tab-bar";
import type { AppRoute } from "./app";

type Props = Readonly<{
  appName: string;
  userLogin: string;
  routes: AppRoute[];
}>;

type HeaderTabData = TabData<AppRoute["path"]>;
type TabBarDisplay = NonNullable<ComponentProps<"oj-c-tab-bar">["display"]>;
type TabBarSelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-tab-bar">["onselectionChanged"]>
>[0];

const toTabIconClass = (iconClass: string) =>
  iconClass.replace(/\boj-navigationlist-item-icon\b/g, "").trim();

export const Header = (props: Props) => {
  const location = useLocation();
  const mediaQueryRef = useRef<MediaQueryList>(
    matchMedia(ResponsiveUtils.getFrameworkQuery("sm-only")!)
  );

  const [isSmallWidth, setIsSmallWidth] = useState(
    mediaQueryRef.current.matches
  );

  const handleMediaQueryChange = useCallback((e: MediaQueryListEvent) => {
    setIsSmallWidth(e.matches);
  }, []);

  useEffect(() => {
    mediaQueryRef.current.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQueryRef.current.removeEventListener(
        "change",
        handleMediaQueryChange
      );
  }, [handleMediaQueryChange]);

  const display = useMemo<TabBarDisplay>(
    () => (isSmallWidth ? "icons" : "standard"),
    [isSmallWidth],
  );

  const tabs = useMemo<HeaderTabData[]>(
    () =>
      props.routes.map((route) => ({
        itemKey: route.path,
        label: route.detail.label,
        icon: {
          type: "class",
          class: toTabIconClass(route.detail.iconClass),
        },
      })),
    [props.routes],
  );

  const selectedPage = location.path.startsWith("/examples")
    ? "/examples"
    : props.routes.find((route) => route.path === location.path)?.path ??
      "/bindings";

  const getRouteTarget = (path: AppRoute["path"]) =>
    path === "/examples" ? "/examples/collection" : path;

  const routeTo = useCallback(
    (path: AppRoute["path"]) => {
      const targetPath = getRouteTarget(path);

      if (location.path !== targetPath) {
        location.route(targetPath);
      }
    },
    [location],
  );

  const pageChangeHandler = useCallback(
    (event: TabBarSelectionChangedEvent) => {
      const nextPath = event.detail.value;

      if (nextPath) {
        routeTo(nextPath);
      }
    },
    [routeTo],
  );

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
            <oj-c-tab-bar
              selection={selectedPage}
              edge="top"
              id="navilist1"
              aria-label="Main navigation, select a page"
              onselectionChanged={pageChangeHandler}
              data={tabs}
              display={display}
              layout="condense"
              overflow="hidden"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
