import { h } from "preact";

export const inputDateMaskDescription = (
  <>
    <p>
      This recipe shows the core pack <code>oj-c-input-date-mask</code> example
      in the recipe layout.
    </p>
    <p>
      It follows the cookbook input date mask examples for simple entry,
      restricted ranges, width behavior, and assistance states.
    </p>
  </>
);

export const inputDateMaskRecipe = (
  <ol>
    <li>Add an <code>oj-c-input-date-mask</code> input.</li>
    <li>
      Bind the date value and update it through <code>valueChanged</code>.
    </li>
    <li>
      Add required, help, and custom message states to compare validation
      behavior.
    </li>
  </ol>
);
