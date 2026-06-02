import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an
    <a href="jsdocs/oj-c.ActionCard.html"><code class="prettyprint">oj-c-action-card</code></a>
    element
  </li>
  <li>
    Add an
    <a href="jsdocs/oj-c.ActionCard.html#event:ojAction">ojAction</a>
    event listener to the
    <code class="prettyprint">oj-c-action-card</code>
    element using the on-oj-action attribute
  </li>
</ol>`;

export const actionCardBasicActionCardcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
