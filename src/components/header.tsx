import "oj-c/tab-bar";
import "oj-c/menu-button";
import type { TabData } from "oj-c/tab-bar";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import 'preact';
import { type ComponentProps } from 'preact';
import { useLocation } from "preact-iso";
import { useCallback,useEffect,useMemo,useRef,useState } from "preact/hooks";
import type { AppRoute, ThemeMode } from "./app";

type Props = Readonly<{
  appName: string;
  userLogin: string;
  routes: AppRoute[];
  themeMode: ThemeMode;
  onThemeModeChanged: (mode: ThemeMode) => void;
}>;

type HeaderTabData = TabData<AppRoute["path"]>;
type TabBarDisplay = NonNullable<ComponentProps<"oj-c-tab-bar">["display"]>;
type TabBarSelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-tab-bar">["onselectionChanged"]>
>[0];
type MenuItems = NonNullable<ComponentProps<"oj-c-menu-button">["items"]>;
type MenuSelection = NonNullable<
  ComponentProps<"oj-c-menu-button">["selection"]
>;
type MenuSelectionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-menu-button">["onojMenuSelection"]>
>[0];

const THEME_MENU_GROUP = "appearance";
const DARK_MODE_MENU_VALUE = "dark-mode";

const settingsMenuItems: MenuItems = [
  {
    type: "selectmultiple",
    key: THEME_MENU_GROUP,
    items: [
      { label: "Dark Mode", value: DARK_MODE_MENU_VALUE },
      { label: "Compact Density", value: "compact-density" },
      { label: "Notifications", value: "notifications" },
    ],
  },
];

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
  const [settingsSelection, setSettingsSelection] = useState<MenuSelection>(
    () => ({
      [THEME_MENU_GROUP]:
        props.themeMode === "dark" ? [DARK_MODE_MENU_VALUE] : [],
    }),
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

  useEffect(() => {
    setSettingsSelection((currentSelection) => {
      const currentValues = currentSelection[THEME_MENU_GROUP];
      const values = Array.isArray(currentValues)
        ? currentValues.filter((value) => value !== DARK_MODE_MENU_VALUE)
        : [];

      if (props.themeMode === "dark") {
        values.push(DARK_MODE_MENU_VALUE);
      }

      return { ...currentSelection, [THEME_MENU_GROUP]: values };
    });
  }, [props.themeMode]);

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

  const settingsSelectionHandler = useCallback(
    (event: MenuSelectionEvent) => {
      if (event.detail.menuSelectionGroupKey !== THEME_MENU_GROUP) {
        return;
      }

      const selectedValues = Array.isArray(event.detail.value)
        ? event.detail.value
        : [];

      setSettingsSelection({ [THEME_MENU_GROUP]: selectedValues });
      props.onThemeModeChanged(
        selectedValues.includes(DARK_MODE_MENU_VALUE) ? "dark" : "light",
      );
    },
    [props.onThemeModeChanged],
  );

  return (
    <header role="banner" class="oj-web-applayout-header">
      <div class="oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center">
        <div class="oj-flex-bar-middle oj-sm-align-items-baseline">
          <span
            role="img"
            class="oj-icon demo-oracle-icon oj-sm-margin-5x"
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
          <div class="app-theme-switch">
            <oj-c-menu-button
              id="appSettingsMenu"
              label="Settings"
              tooltip="Settings"
              chroming="borderless"
              display="icons"
              items={settingsMenuItems}
              selection={settingsSelection}
              onojMenuSelection={settingsSelectionHandler}
            >
              <span slot="startIcon" class="oj-ux-ico-settings" />
            </oj-c-menu-button>
          </div>
        </div>
      </div>
    </header>
  );
};
