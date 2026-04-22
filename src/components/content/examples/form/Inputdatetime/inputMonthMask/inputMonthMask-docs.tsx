import { h } from "preact";

export const inputMonthMaskDescription = (
  <>
    <p>
      This recipe shows the core pack <code>oj-c-input-month-mask</code>{" "}
      example with the standard recipe structure.
    </p>
    <p>
      It follows the cookbook month mask examples for overview, simple entry,
      restricted ranges, and width behavior.
    </p>
  </>
);

export const inputMonthMaskRecipe = (
  <ol>
    <li>Add an <code>oj-c-input-month-mask</code> control.</li>
    <li>
      Bind the month value and apply range settings where the month must stay
      within bounds.
    </li>
    <li>
      Use help or message props to communicate expected month entry patterns.
    </li>
  </ol>
);
