import 'preact';

const descriptionHtmlText = String.raw`<p>This demo shows the following features all in one oj-c-list-view demo:</p>
<ul>
  <li>Swipe Actions</li>
  <li>Refresher</li>
  <li>High-Water Mark scrolling</li>
  <li>CRUD - Create a new task, update the active task, complete a task, and delete tasks</li>
  <li>Use of Buttonset where one of the buttons can be toggled to switch between view and edit mode for the entire ListView</li>
  <li>Reordering - The edit mode allows items to be reordered within ListView</li>
  <li>Selection - The edit mode enables selection and deleting the selected items</li>
  <li>No Data - Deleting all items shows custom no-data content in ListView</li>
</ul>`;

export const listViewOverviewcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
