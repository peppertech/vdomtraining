import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an
    <a href="jsdocs/oj.ojActionCard.html"><code class="prettyprint">oj-c-action-card</code></a>
    element
  </li>
  <li>
    Create an
    <code>DataProvider</code>
   . In this case since data is an
   <code>array</code>,
   use the
   <code>ArrayDataProvider</code>
   to attribute.
  </li>
  <li>
    Specify the <code class="prettyprint">oj-c-conveyor-belt.</code> and its content in the itemTemplate slot.
  </li>
  <li>
    Restrict the width of the
    <code class="prettyprint">oj-c-conveyor-belt</code>
    element as needed, beyond which overflow will be managed by the ConveyorBelt.
  </li>
</ol>`;

export const conveyorBeltActionCardsConveyorBeltcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
