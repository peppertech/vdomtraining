import { h } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import "ojs/ojtoolbar";
import "ojs/ojmenu";
import "ojs/ojbutton";
import "ojs/ojnavigationlist";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { ojNavigationList } from "ojs/ojnavigationlist";

type Props = Readonly<{
  appName: string;
  userLogin: string;
  page?: string;
  routes: Array<object>;
  onPageChanged: (value: string) => void;
}>;

type Route = {
  path: string;
  detail: object;
};

export const Header = (props: Props) => {
  const [selectedPage, setSelectedPage] = useState<string>(
    props.page ? props.page : "bindings"
  );
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
  }

  const getDisplayType = () => {
    return isSmallWidth ? "icons" : "all";
  }

  const routesDP = new ArrayDataProvider(props.routes.slice(1), {
    keyAttributes: "path",
  });

  const pageChangeHandler = (
    event: ojNavigationList.selectionChanged<Route["path"], Route>
  ) => {
    props.onPageChanged(event.detail.value);
  };

  const renderNavList = (item: ojNavigationList.ItemContext<string, Route>) => {
    return (
      <li id={item.data.path}>
        <a href="#">
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
            alt="Oracle Logo"
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
              selection={props.page}
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
}
