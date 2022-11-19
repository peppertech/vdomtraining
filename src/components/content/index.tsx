import { h } from "preact";
import BindingContent from "./bindings/index";
import ModulesContent from "./modules/index";
import ExampleContent from "./examples/index";

type Props = {
  page: string;
};

const Content = (props: Props) => {
  let pageContent = (page) => {
    switch (page) {
      case "modules":
        return <ModulesContent />;
      case "bindings":
        return <BindingContent />;
      case "examples":
        return <ExampleContent />;
      default:
        return <BindingContent />;
    }
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      {pageContent(props.page)}
    </div>
  );
};
export default Content;
