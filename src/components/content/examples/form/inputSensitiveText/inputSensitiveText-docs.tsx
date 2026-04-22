import { h } from "preact";

export const inputSensitiveTextDescription = (
  <>
    <p>
      This recipe presents the core pack <code>oj-c-input-sensitive-text</code>{" "}
      example in the recipe layout.
    </p>
    <p>
      It follows the cookbook examples for binding, clear icon usage, max
      length, label variants, alignment, virtual keyboard settings, and width.
    </p>
  </>
);

export const inputSensitiveTextRecipe = (
  <ol>
    <li>Add an <code>oj-c-input-sensitive-text</code> field.</li>
    <li>
      Bind the value and configure label, max length, or keyboard options as
      needed.
    </li>
    <li>
      Use state and assistance props to show how sensitive entry is guided in
      forms.
    </li>
  </ol>
);
