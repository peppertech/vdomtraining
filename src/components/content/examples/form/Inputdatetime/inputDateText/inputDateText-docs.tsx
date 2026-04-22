import { h } from "preact";

export const inputDateTextDescription = (
  <>
    <p>
      This recipe wraps the <code>oj-c-input-date-text</code> example with the
      standard description, demo, and recipe structure.
    </p>
    <p>
      The demo focuses on text-based date entry, messaging, and converter-aware
      interactions.
    </p>
  </>
);

export const inputDateTextRecipe = (
  <ol>
    <li>Add an <code>oj-c-input-date-text</code> field.</li>
    <li>
      Bind the value and apply converter settings so typed dates are interpreted
      consistently.
    </li>
    <li>
      Demonstrate readonly, required, or message states to show user guidance.
    </li>
  </ol>
);
