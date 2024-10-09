import "preact";
import BindingContent from "./bindings/index";
import ModulesContent from "./modules/index";
import ExampleContent from "./examples/index";
import Localization from "./localization/index";
import CoreRouter = require("ojs/ojcorerouter");

type Props = {
  page: string;
  router: CoreRouter;
};

const Content = ({ router, page }: Props) => {
  let pageContent = (page: string) => {
    switch (page) {
      case "modules":
        return <ModulesContent />;
      case "bindings":
        return <BindingContent />;
      case "localization":
        return <Localization />;
      case "examples":
        return <ExampleContent router={router} />;
    }
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      {pageContent(page as string)}
    </div>
  );
};
export default Content;
