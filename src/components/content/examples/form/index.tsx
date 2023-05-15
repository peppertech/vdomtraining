import FormElements from "./formelements";
import { h } from "preact";

const Form = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Form Elements </h2>
          <FormElements />
        </div>
      </div>
    </div>
  );
};
export default Form;
