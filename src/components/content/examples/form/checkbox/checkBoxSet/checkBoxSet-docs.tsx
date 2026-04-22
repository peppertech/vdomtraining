import { h } from "preact";

export const checkBoxSetDescription = (
  <>
    <p>
      This recipe presents the legacy <code>oj-checkboxset</code> example in
      the recipe layout.
    </p>
    <p>
      It takes cues from the cookbook checkbox set examples for base setup,
      data providers, readonly behavior, states, validation, and filtering.
    </p>
  </>
);

export const checkBoxSetRecipe = (
  <ol>
    <li>Add an <code>oj-checkboxset</code> with a set of options.</li>
    <li>
      Bind the selected values array and update it on interaction.
    </li>
    <li>
      Add validation or readonly and disabled variations to compare checkbox set
      behavior across scenarios.
    </li>
  </ol>
);
