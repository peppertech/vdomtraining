import { customElement, ExtendGlobalProps } from "ojs/ojvcomponent";
import { h, Component, ComponentChild } from "preact";
import CoreRouter = require("ojs/ojcorerouter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");
import Context = require("ojs/ojcontext");
import { Header } from "./header";
import { Footer } from "./footer";
import { Content } from "./content/index";

type Props = {
  appName?: string;
  userLogin?: string;
};

type State = {
  routePath?: string;
  routedComponent?: ComponentChild;
};

@customElement("app-root")
export class App extends Component<ExtendGlobalProps<Props>, State> {
  static defaultProps: Props = {
    appName: "VDOM Training",
    userLogin: "john.hancock@oracle.com"
  };

  private readonly routeArray = [
    { path: "", redirect: "bindings" },
    {
      path: "bindings",
      detail: {
        label: "Bindings",
        iconClass: "oj-navigationlist-item-icon oj-ux-ico-binding-control"
      }
    },
    {
      path: "modules",
      detail: {
        label: "Modules",
        iconClass: "oj-navigationlist-item-icon oj-ux-ico-ungroup"
      }
    },
    {
      path: "examples",
      detail: {
        label: "Examples",
        iconClass:
          "oj-navigationlist-item-icon oj-ux-ico-instructor-training-plus"
      }
    }
  ];

  private readonly router = new CoreRouter<CoreRouter.DetailedRouteConfig>(this.routeArray, {
    urlAdapter: new UrlParamAdapter()
  });

  state = { routePath: "" };

  constructor(props: ExtendGlobalProps<Props>) {
    super(props);
    this.router.currentState.subscribe(this.routerUpdated.bind(this));
    this.router.sync();
  }

  pageChangeHandler = (value: string) => {
    this.router.go({ path: value });
  };

  render(props: Props, state: State): ComponentChild {
    return (
      <div id="appContainer" class="oj-web-applayout-page">
        <Header
          appName={props.appName}
          page={this.state.routePath}
          onPageChanged={this.pageChangeHandler}
          userLogin={props.userLogin}
          routes={this.routeArray}
        />
        <Content page={this.state.routePath} />
        <Footer />
      </div>
    );
  }
  routerUpdated(actionable: CoreRouter.ActionableState<CoreRouter.DetailedRouteConfig>): void {
    // Update our state based on new router state
    const routePath = actionable.state?.path;
    this.setState({ routePath });
  }

  componentDidMount() {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }
}
