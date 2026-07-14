import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>Create an ArrayDataProvider with a keyAttributes value that uniquely identifies each task.</li>
  <li>Bind the provider to oj-list-view and configure scroll-policy-options.fetch-size to enable high-water mark scrolling.</li>
  <li>Use oj-list-item-layout in the itemTemplate to lay out the task name, status badge, type icon, description, and date metadata.</li>
  <li>Wrap the view-mode ListView in oj-refresher and assign a refresh function to the refreshContent property.</li>
  <li>In the view-mode item template, add oj-swipe-actions with start and end slots for completing and deleting a task.</li>
  <li>Use oj-buttonset-one to toggle between view mode and edit mode for the entire ListView.</li>
  <li>In edit mode, use oj-selector with selection-mode all and multiple, backed by the ListView selected KeySet, so selected tasks can be deleted together.</li>
  <li>Set dnd.reorder.items to enabled and listen for ojReorder to update the task array after items are reordered.</li>
  <li>Listen for ojItemAction to make the clicked task active and update the detail panel.</li>
  <li>Use the noData slot to render custom content when all tasks have been removed.</li>
</ol>`;

export const listViewOverviewListViewRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
