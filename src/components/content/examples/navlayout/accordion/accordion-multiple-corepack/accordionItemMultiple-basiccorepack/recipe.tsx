import { h } from "preact";

export const accordionItemMultipleBasiccorepackRecipe = (
  <>
    <ul>
      <li>
        Use <code class="prettyprint">oj-c-accordion-item-multiple</code> for
        each item to allow multiple expansions.
      </li>
      <li>
        Set the <code class="prettyprint">expanded-keys</code> property to a
        state-backed array to control expanded items.
      </li>
      <li>
        Set <code class="prettyprint">item-key</code> on each item to uniquely
        identify it.
      </li>
      <li>
        If the header contains non-textual content, add the{" "}
        <code class="prettyprint">aria-label</code> attribute to the header
        slot for accessibility.
      </li>
    </ul>
  </>
);
