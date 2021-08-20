import { h, Component, ComponentChild } from "preact";
import { BindingContent } from "./bindings/index";
import { ModulesContent } from "./modules/index";
import { ExampleContent } from "./examples/index";

type Props = {
  page: string;
};

export class Content extends Component<Props> {

  pageContent = (page) => {
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

  render(props: Props): ComponentChild {
    return (
      <div class="oj-web-applayout-max-width oj-web-applayout-content">
        {this.pageContent(props.page)}
      </div>
    );
  }
}
