import { h } from "preact";
import Modules from "./modules";

const ModulesContent = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h1 class="oj-typography-heading-lg"> Modules </h1>
      <h2 class="oj-typography-heading-sm">
        oj-module element is replaced by components.
      </h2>
      <hr />
      <h3 class="oj-typography-heading-xs">Modules / Templates</h3>
      <Modules />
    </div>
  );
};
export default ModulesContent;
