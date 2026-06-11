import "preact";
import { useEffect } from "preact/hooks";
import BindingContent from "./bindings/index";
import ModulesContent from "./modules/index";
import ExampleContent from "./examples/index";
import { Route, Router, useLocation } from "preact-iso";

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
        <Route path="/" component={Redirect} to="/bindings" />
        <Route path="/bindings" component={BindingContent} />
        <Route path="/modules" component={ModulesContent} />
        <Route path="/examples" component={Redirect} to="/examples/collection" />
        <Route path="/examples/*" component={ExampleContent} />
        <Route default component={Redirect} to="/bindings" />
      </Router>
    </div>
  );
};

export default Content;
