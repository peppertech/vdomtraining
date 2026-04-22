import { h } from "preact";

export const checkBoxCorePackDescription = (
  <>
    <p>
      This recipe shows the core pack <code>oj-c-checkbox</code> example in the
      recipe format.
    </p>
    <p>
      It takes cues from the core pack checkbox cookbook examples for overview
      and cross-field validation while using the existing VDOM state and
      messaging demo.
    </p>
  </>
);

export const checkBoxCorePackRecipe = (
  <ol>
    <li>Add an <code>oj-c-checkbox</code> control.</li>
    <li>
      Configure value, required, help, and message props to show the main state
      variations.
    </li>
    <li>
      Pair the checkbox with form layout positioning or validation when it
      participates in a larger flow.
    </li>
  </ol>
);
