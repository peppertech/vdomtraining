import FormElements from "./formelements";
import { Test4 } from "./test4";
import  Test5 from "./test5";
import Test from "./test";
import { h } from "preact";

const Form = () => {

  const test = () => { }

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Form Elements </h2>
          {/* <FormElements /> */}
          <Test4 />
          <Test5 maxPage={10} minPage={0} onPageChange={test} />
        </div>
      </div>
    </div>
  );
};
export default Form;
