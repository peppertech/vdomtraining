import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'listViewCorepack', 'basic'); return false;">
      basic oj-c-list-view demo
    </a>
    for more information about configuring oj-c-list-view.  
  </li>
  <li>
    Use the
    <code>selection-mode</code>
    attribute to enable multiple item selection.
  </li>
  <li>
    Use the
    <code>selected</code>
    attribute to keep track of current selection.
  </li>
  <li>
    Specify a template using the
    <code>itemTemplate</code>
    slot to specify what gets rendered inside the list item.
  </li>
</ul>`;

export const listViewCrudcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
