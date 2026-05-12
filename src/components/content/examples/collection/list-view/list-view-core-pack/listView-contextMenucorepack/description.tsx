import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or a grid with highly interactive features.</p>This demo shows how to associate a custom context menu to a ListView. Note that items can be conditionally added to the menu, in this demo if the employee's title includes the word 'Manager' an additional 'Manager Specific Item' will be added to the menu.`;

export const listViewContextMenucorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
