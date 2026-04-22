import { h } from "preact";

export const inputNumberDescription = (
  <>
    <p>
      This recipe presents the legacy <code>oj-input-number</code> example in
      the recipe layout.
    </p>
    <p>
      It follows the cookbook input number examples for converter usage, min and
      max, raw value, step handling, keyboard support, and width behavior.
    </p>
  </>
);

export const inputNumberRecipe = (
  <ol>
    <li>Add an <code>oj-input-number</code> field.</li>
    <li>
      Configure min, max, step, or converter options to shape numeric entry.
    </li>
    <li>
      Add validation, messages, or raw-value display when you need deeper input
      feedback.
    </li>
  </ol>
);
