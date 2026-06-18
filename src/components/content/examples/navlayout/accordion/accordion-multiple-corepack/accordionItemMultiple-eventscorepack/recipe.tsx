import { h } from "preact";

export const accordionItemMultipleEventscorepackRecipe = (
  <>
    <ol>
      <li>
        Click the disclosure icon in any{" "}
        <code class="prettyprint">oj-c-accordion-item-multiple</code> to see
        what events are fired.
      </li>
      <li>
        Observe the event log for details about expanded and collapsed items
        and their keys.
      </li>
      <li>
        Handle the <code class="prettyprint">oj-expand</code> and{" "}
        <code class="prettyprint">oj-collapse</code> events to log or react to
        item state changes.
      </li>
      <li>
        Define <code class="prettyprint">expandedKeys</code> as a state-backed
        array to control which items are expanded.
      </li>
    </ol>
  </>
);
