import { h, Component, ComponentChild } from "preact";
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
  onPageChanged?: (value: string) => void;
}>;

type State = {
  displayType: string;
  endIconClass: string;
  selectedPage: string;
};

type Route = {
  path: string;
  detail: object;
}

export class Header extends Component<Props, State> {
  private mediaQuery: MediaQueryList;
  public selectedPage: string;
  routesDP: ArrayDataProvider<string, Route>;

  constructor(props: Props) {
    super(props);
    
    // Create ADP with partial array, excluding first redirect route
    this.routesDP = new ArrayDataProvider(this.props.routes.slice(1), {
      keyAttributes: "path"
    });

    const smallOnlyQuery = ResponsiveUtils.getFrameworkQuery(
      ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
    );
    this.mediaQuery = window.matchMedia(smallOnlyQuery);
    this._mediaQueryChangeListener = this._mediaQueryChangeListener.bind(this);
    const displayType = this._getDisplayTypeFromMediaQuery(this.mediaQuery);
    const endIconClass = this._getEndIconClassFromDisplayType(displayType);
    let selectedPage = "";
    this.state = {
      displayType,
      endIconClass,
      selectedPage
    };

    this.setState({
      selectedPage: this.props.page ? this.props.page : "bindings"
    });
  }

  pageChangeHandler = (
    event: ojNavigationList.selectionChanged<string, Route>
  ) => {
    this.props.onPageChanged(event.detail.value);
  };

  renderNavList = (item: ojNavigationList.ItemContext<string, Route>) => {
    return (
      <li id={item.data.path}>
        <a href="#">
          <span class={item.data.detail.iconClass} />
          {this.state.displayType === "all" ? item.data.detail.label : ""}
        </a>
      </li>
    );
  };

  render(props: Props): ComponentChild {
    return (
      <header role="banner" class="oj-web-applayout-header">
        <div class="oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center">
          <div class="oj-flex-bar-middle oj-sm-align-items-baseline">
            <span
              role="img"
              class="oj-icon demo-oracle-icon"
              title="Oracle Logo"
              alt="Oracle Logo"></span>
            <h1
              class="oj-sm-only-hide oj-web-applayout-header-title"
              title="Virtual DOM Training Application">
              {props.appName}
            </h1>
          </div>
          <div class="oj-flex-bar-end">
            <div
              role="navigation"
              class="oj-web-applayout-max-width oj-web-applayout-navbar">
              <oj-navigation-list
                selection={this.props.page}
                edge="top"
                id="navilist1"
                aria-label="Main navigation, select a page"
                onselectionChanged={this.pageChangeHandler}
                drillMode="none"
                data={this.routesDP}>
                <template slot="itemTemplate" render={this.renderNavList} />
              </oj-navigation-list>
            </div>
          </div>
        </div>
      </header>
    );
  }

  componentDidMount() {
    this.mediaQuery.addEventListener("change", this._mediaQueryChangeListener);
  }

  componentWillUnmount() {
    this.mediaQuery.removeEventListener(
      "change",
      this._mediaQueryChangeListener
    );
  }

  _mediaQueryChangeListener(mediaQuery) {
    const displayType = this._getDisplayTypeFromMediaQuery(mediaQuery);
    const endIconClass = this._getEndIconClassFromDisplayType(displayType);
    this.setState({
      displayType,
      endIconClass
    });
  }

  _getDisplayTypeFromMediaQuery(mediaQuery) {
    return mediaQuery.matches ? "icons" : "all";
  }

  _getEndIconClassFromDisplayType(displayType) {
    return displayType === "icons"
      ? "oj-icon demo-appheader-avatar"
      : "oj-component-icon oj-button-menu-dropdown-icon";
  }
}
