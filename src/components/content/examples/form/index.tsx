import FormElements from "./formelements";
import { h } from "preact";
import FormControls from "./formcontrols";
import FormsHome from "./home";

const Form = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
          {/* <h2 class="oj-typography-heading-sm"> Form Elements </h2> */}
          {/* <FormElements /> */}
          {/* <FormControls /> */}
          <FormsHome />
        </div>
      </div>
    </div>
  );
};
export default Form;
