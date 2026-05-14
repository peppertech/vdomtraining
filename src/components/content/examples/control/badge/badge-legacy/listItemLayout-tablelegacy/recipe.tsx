import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Create a table with the dashboard data.</li>
  <li>
    Within the template, use an
    <code class="prettyprint">oj-list-item-layout</code>
    , whose attributes are bound to properties of the template context, as appropriate.
  </li>
  <li>
    You can use
    <code class="prettyprint">inset = "none"</code> attribute
    to remove padding around the list item layout.
  </li>
  <li>
    The spending profile column uses
    <code class="prettyprint">oj-badge</code>
    of different colors depending on the text's value.
  </li>
</ol>`;

export const listItemLayoutTablelegacyRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
