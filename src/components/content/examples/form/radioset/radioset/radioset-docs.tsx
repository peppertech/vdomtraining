import { h } from "preact";

export const radiosetDescription = (
  <>
    <p>
      This recipe wraps the legacy <code>oj-radioset</code> example in the
      recipe layout.
    </p>
    <p>
      It takes cues from the cookbook radioset examples for states, readonly
      behavior, validation, icons, context menus, and data provider usage.
    </p>
  </>
);

export const radiosetRecipe = (
  <ol>
    <li>Add an <code>oj-radioset</code> with a defined option list.</li>
    <li>
      Bind the selected value and update it as the user changes selection.
    </li>
    <li>
      Add state, help, or validation variations so the demo covers common radio
      group usage patterns.
    </li>
  </ol>
);
