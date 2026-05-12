import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Create an ArrayDataProvider with a keyAttributes value that uniquely identifies each item.</li>
  <li>Bind the provider to oj-c-list-view and enable singleRequired selection so the detail panel always has an active item.</li>
  <li>Use oj-c-list-item-layout in the itemTemplate to lay out the avatar, primary text, and secondary text.</li>
  <li>Listen for selectedChanged and ojFirstSelectedItem to keep the selected KeySet and the detail panel in sync.</li>
  <li>Use ojItemAction with item.enterKeyFocusBehavior set to none so activating an item also updates the selected detail.</li>
</ol>`;

export const listViewOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
