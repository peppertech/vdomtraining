import FormElements from "./formelements";
import { Test2 } from "./test2";
import { Test3 } from "./test3";
import { Test4 } from "./test4";
import { Test5 } from "./test5";
import { Test6 } from "./test6";
import { Test7 } from "./test7";
import { RichCheckboxSet } from "./richcheckboxset";
import { Test1 } from "./test1";
import "preact";

export const Form = () => {

  const test = () => { }

  return (
    <div class="oj-web-applayout-content">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
          <h2 class="oj-typography-heading-sm"> Form Elements </h2>
          {/* <FormElements /> */}
          <Test1 tag="This is my tag" language="en-US" />
          <Test2 />
          <Test3 />
          <Test4 />
          <Test5 maxPage={10} minPage={0} onPageChange={test} />
          <Test6 />
          <Test7 />
          <RichCheckboxSet />
        </div>
      </div>
    </div>
  );
};
