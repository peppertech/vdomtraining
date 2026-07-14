import 'preact';

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or a grid with highly interactive features.</p>This demo shows how to enable single selection, get information about the selected item, enforce an item to be selected, and clear the current selected item in oj-c-list-view.
Note that updates for the first selected item are only available when the "Selection Required" option is enabled.`;

export const listViewSingleSelectioncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
