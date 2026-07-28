import "preact";
import { Route,Router,useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import BindingContent from "./bindings/index";
import ExampleContent from "./examples/index";
import ModulesContent from "./modules/index";

type RedirectProps = {
  to: string;
};

const Redirect = ({ to }: RedirectProps) => {
  const location = useLocation();

  useEffect(() => {
    if (location.path !== to) {
      location.route(to, true);
    }
  }, [location, to]);

  return null;
};

const Content = () => {
  return (
    <div class="oj-web-applayout-content">
      <Router>
        <Route path="/" component={Redirect} to="/examples" />
        <Route path="/bindings" component={BindingContent} />
        <Route path="/modules" component={ModulesContent} />
        <Route path="/examples" component={Redirect} to="/examples/collection" />
        <Route path="/examples/*" component={ExampleContent} />
        <Route default component={Redirect} to="/examples" />
      </Router>
    </div>
  );
};

export default Content;
