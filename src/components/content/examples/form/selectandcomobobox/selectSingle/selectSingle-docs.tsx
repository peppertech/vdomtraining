import { h } from "preact";

export const selectSingleDescription = (
  <>
    <p>
      This recipe presents the existing <code>oj-select-single</code> example in
      the recipe layout.
    </p>
    <p>
      It takes logical cues from the select single cookbook examples for item
      text, item templates, collection templates, events, and width behavior.
    </p>
  </>
);

export const selectSingleRecipe = (
  <ol>
    <li>Add an <code>oj-select-single</code> control with option data.</li>
    <li>
      Bind the selected value and enrich the dropdown with item text or template
      renderers as needed.
    </li>
    <li>
      Add events, collection rendering, or width handling to match the target
      form experience.
    </li>
  </ol>
);
