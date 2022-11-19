import { h } from "preact";
import Attributes from "./attributes";
import JETAttr from "./jetattributes";
import JETforeach from "./jetforeach";
import Foreach from "./foreach";

const BindingContent = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h1 class="oj-typography-heading-lg"> Bindings</h1>
      <h2 class="oj-typography-heading-sm">All binding is done using JSX.</h2>
      <hr />
      <h3 class="oj-typography-heading-xs">Attribute and Text</h3>
      <JETAttr />
      <Attributes
        testId="fred"
        message="In VDOM, both the id and the content are defined using JSX and props"
      />
      <br />
      <h3 class="oj-typography-heading-xs">For-Each</h3>
      <JETforeach />
      <Foreach />
    </div>
  );
};
export default BindingContent;
