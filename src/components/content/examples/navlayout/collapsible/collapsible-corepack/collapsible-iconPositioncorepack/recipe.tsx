import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an
    <code class="prettyprint">oj-c-collapsible</code>
    element with two child elements.
  </li>
  <li>To set the icon at the end of the header, add the <code class="prettyprint">icon-position="end" </code>property to the <code class="prettyprint">oj-c-collapsible</code> component.</li>
  <li>To set the icon at the beginning of the header, add the <code class="prettyprint">icon-position="start" </code>property to the <code class="prettyprint">oj-c-collapsible</code> component.</li>
</ol>`;

export const collapsibleIconPositioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
