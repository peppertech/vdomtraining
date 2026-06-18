import { h } from "preact";

export const accordionMultiExpandAccordionRecipe = (
  <>
    <ul>
      <li>
        Add the <code class="prettyprint">multiple</code> property to{" "}
        <code class="prettyprint">oj-accordion</code>.
      </li>
      <li>
        Add the <code class="prettyprint">expanded</code> property. Note that
        it overrides the child expanded properties.
      </li>
      <li>
        If the collapsible header contains non-textual content, add the{" "}
        <code class="prettyprint">aria-label</code> attribute to the header
        slot.
      </li>
    </ul>
  </>
);
