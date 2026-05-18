import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a JET Truncating Text by specifying the
    <code class="prettyprint">&lt;oj-c-truncating-text></code>
    element.
  </li>
  <li>
    Use the overflow-wrap attribute to control how words with should behave when moving to the next
    line.
  </li>
</ol>`;

export const truncatingTextOverflowWrapcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
