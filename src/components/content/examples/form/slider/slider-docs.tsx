import { h } from "preact";

export const sliderDescription = (
  <>
    <p>
      This recipe wraps the legacy <code>oj-slider</code> example in the newer
      recipe format.
    </p>
    <p>
      The demo follows cookbook slider examples for state, orientation,
      validation, and width-based configuration.
    </p>
  </>
);

export const sliderRecipe = (
  <ol>
    <li>Add an <code>oj-slider</code> with a numeric value.</li>
    <li>
      Configure min, max, step, and orientation to show the supported slider
      variants.
    </li>
    <li>
      Add validation or readonly and disabled states to compare behavior across
      use cases.
    </li>
  </ol>
);
