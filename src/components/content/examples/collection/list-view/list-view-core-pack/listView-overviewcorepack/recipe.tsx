import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Create a MutableArrayDataProvider with a keyAttributes value that uniquely identifies each task.</li>
  <li>Bind the provider to oj-c-list-view and configure scrollPolicyOptions.fetchSize to enable high-water mark scrolling.</li>
  <li>Use oj-c-list-item-layout in the itemTemplate to lay out the task name, status badge, type icon, description, and date metadata.</li>
  <li>Wrap the view-mode ListView in oj-refresher and assign a refresh function to the refreshContent property.</li>
  <li>In the view-mode item template, add oj-swipe-actions with start and end slots for completing and deleting a task.</li>
  <li>Use oj-buttonset-one to toggle between view mode and edit mode for the entire ListView.</li>
  <li>In edit mode, use oj-c-selector-all and oj-c-selector with the ListView selected KeySet so selected tasks can be deleted together.</li>
  <li>Set reorderable.items to enabled and listen for ojReorder to update the task array after items are reordered.</li>
  <li>Listen for ojItemAction to make the clicked task active and update the detail panel.</li>
  <li>Use the noData slot to render custom content when all tasks have been removed.</li>
</ol>`;

export const listViewOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
