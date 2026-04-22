import { h } from "preact";

export const inputTimeMaskDescription = (
  <>
    <p>
      This recipe presents the core pack <code>oj-c-input-time-mask</code>{" "}
      example in the recipe layout.
    </p>
    <p>
      It follows the cookbook time mask examples for overview, simple entry,
      restricted ranges, and width-based setup.
    </p>
  </>
);

export const inputTimeMaskRecipe = (
  <ol>
    <li>Add an <code>oj-c-input-time-mask</code> field.</li>
    <li>
      Bind time values and configure the mask or format precision needed for the
      use case.
    </li>
    <li>
      Add help and custom messages to compare assistance and validation states.
    </li>
  </ol>
);
