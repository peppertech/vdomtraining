import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Create a MutableArrayDataProvider with a keyAttributes value that uniquely identifies each item.</li>
  <li>Bind the provider to oj-c-list-view and use singleRequired selection in view mode so the detail panel always has an active item.</li>
  <li>Use multipleToggle selection in edit mode so multiple tasks can be removed together.</li>
  <li>Use oj-c-list-item-layout in the itemTemplate to lay out primary, secondary, and tertiary task text.</li>
  <li>Listen for selectedChanged, ojFirstSelectedItem, and ojItemAction to keep the selected KeySet and detail panel in sync.</li>
  <li>Use the noData slot to render custom content when all tasks have been removed.</li>
</ol>`;

export const listViewOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
