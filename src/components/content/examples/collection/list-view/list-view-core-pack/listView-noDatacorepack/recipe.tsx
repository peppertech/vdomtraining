import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>Use the <code>oj-c-list-view</code> tag to create a JET ListView.</li>
  <li>Use the <code>noData</code> slot to specify the content to show when there is no data.</li>
  <li>
    To adhere to Redwood design for list items, use the
    <code>oj-sp-empty-state</code>
    component in the noData slot.
  </li>
</ul>`;

export const listViewNoDatacorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
