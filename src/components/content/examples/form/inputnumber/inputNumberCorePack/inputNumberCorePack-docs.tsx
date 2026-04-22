import { h } from "preact";

export const inputNumberCorePackDescription = (
  <>
    <p>
      This recipe shows the core pack <code>oj-c-input-number</code> example in
      the standard recipe format.
    </p>
    <p>
      It follows the core pack cookbook input number examples for states,
      converter behavior, min and max, raw values, prefix and suffix content,
      and keyboard hints.
    </p>
  </>
);

export const inputNumberCorePackRecipe = (
  <ol>
    <li>Add an <code>oj-c-input-number</code> field.</li>
    <li>
      Set value, step, min, and max props to establish the numeric constraints.
    </li>
    <li>
      Add help, messages, and state variations so the example doubles as a
      usage reference.
    </li>
  </ol>
);
