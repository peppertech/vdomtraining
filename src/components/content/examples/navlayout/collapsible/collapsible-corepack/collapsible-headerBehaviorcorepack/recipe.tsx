import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    When embedding other controls in the
    <code class="prettyprint">oj-c-collapsible</code>
    header area, set the
    <code class="prettyprint">class=&quot;oj-clickthrough-disabled&quot;</code>
    on the control to prevent the click event from propagating to the header area.
  </li>
</ol>`;

export const collapsibleHeaderBehaviorcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
