import { h } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import "ojs/ojtoolbar";
import "ojs/ojmenu";
import "ojs/ojbutton";
import "ojs/ojnavigationlist";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { ojNavigationList } from "ojs/ojnavigationlist";

// localization imports
import * as MenuBundle from "ojL10n!./resources/nls/menu";
import { MenuButtonElement } from "ojs/ojbutton";

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
  };

  const getDisplayType = () => {
    return isSmallWidth ? "icons" : "all";
  };

  const routesDP = new ArrayDataProvider(props.routes.slice(1), {
    keyAttributes: "path",
  });

  const pageChangeHandler = (
    event: ojNavigationList.selectionChanged<Route["path"], Route>
  ) => {
    if (event.detail.updatedFrom === "internal")
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

  // locale-menu-button-begin
  const [buttonVal, setButtonVal] = useState(window.localStorage.getItem('mylang'));
  const [iconClassVal, seticonClassVal] = useState("demo-en-flag-icon");

  const toolbarData = {
    toolbar_buttons: [
      {
        label: "English",
        iconClass: "demo-en-flag-icon",
        url: "#"
      },
      {
        label: "Français",
        iconClass: "demo-fr-flag-icon",
        url: "fr/index.html"
      },
      {
        label: "Čeština",
        iconClass: "demo-cz-flag-icon",
        url: "#"
      },
      {
        label: "عربي",
        iconClass: "demo-eg-flag-icon",
        url: "#"
      }
    ]
  };

  /**
   * useEffect loads savedLang value from localStorage and sets default to English if no value is 
   * set in local storage. Also sets associated flag for the current locale.
   */
  useEffect(() => {
    const savedLang = window.localStorage.getItem('mylang');
    if (savedLang) {
      setButtonVal(savedLang);
      let newFlag = "";
      switch (savedLang) {
        case "Čeština":
          newFlag = "demo-cz-flag-icon";
          break;
        case "Français":
          newFlag = "demo-fr-flag-icon";
          break;
        case "عربي":
          newFlag = "demo-eg-flag-icon";
          break;
        default:
          newFlag = "demo-en-flag-icon";
      }
      seticonClassVal(newFlag);
    }
    else {
      setButtonVal('English');
      seticonClassVal('demo-en-flag-icon');
      window.localStorage.setItem('mylang', 'English');
    }
  }, []);

  /**
  * Code to update locale value in localStorage and reload the app
  */
  const langChangeHandler = (event: MenuButtonElement.ojAction) => {
    let lang = event.detail.selectedValue;
    console.log(`Changed language to: ${lang}`);
    let newLocale = "";
    let newFlag = "";
    switch (lang) {
      case "Čeština":
        newLocale = "cs-CZ";
        newFlag = "demo-cz-flag-icon";
        break;
      case "Français":
        newLocale = "fr-FR";
        newFlag = "demo-fr-flag-icon";

        break;
      case "عربي":
        newLocale = "ar-EG";
        newFlag = "demo-eg-flag-icon";
        break;
      default:
        newLocale = "en-US";
        newFlag = "demo-en-flag-icon";
    }
    window.localStorage.setItem('mylocale', newLocale);
    window.localStorage.setItem('mylang', lang);
    setButtonVal(lang);
    seticonClassVal(newFlag);
    location.reload();
  };
  // locale-menu-button-end

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

        {/* <div class="oj-flex-bar-end"> */}
        <div class="oj-flex-bar-center-absolute">
          <div role="navigation" class="oj-web-applayout-max-width oj-web-applayout-navbar">
            <oj-navigation-list selection={props.page}
              edge="top"
              id="navilist1"
              aria-label="Main navigation, select a page"
              onselectionChanged={pageChangeHandler}
              drillMode="none"
              data={routesDP}            >
              <template slot="itemTemplate" render={renderNavList} />
            </oj-navigation-list>
          </div>
        </div>
        <div class="oj-flex-bar-end">
          <oj-menu-button id="userMenu2" display={getDisplayType()} chroming="borderless">
            {/* <span slot="startIcon" class={iconClassVal}></span> */}
            <span slot="startIcon" className={`${iconClassVal} oj-ux-icon-size-8x`}></span>
            {buttonVal}
            <span
              slot="startIcon"
              className={`${MenuBundle.iconClass} oj-ux-icon-size-4x`}
            ></span>
            <oj-menu id="menu1" slot="menu" onojMenuAction={langChangeHandler}>
              {toolbarData.toolbar_buttons.map((button, index) => (
                <oj-option key={index} value={button.label}>
                  <span>
                    <span>{button.label}</span>
                  </span>
                  <span
                    slot="startIcon"
                    className={`${button.iconClass} oj-ux-icon-size-4x`}
                  ></span>
                </oj-option>
              ))}
            </oj-menu>
          </oj-menu-button>
        </div>
      </div>
    </header>
  );
};
