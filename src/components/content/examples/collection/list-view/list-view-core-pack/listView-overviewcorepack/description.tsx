import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or grid with interactive collection features.</p>
<p>This overview shows an oj-c-list-view backed by an ArrayDataProvider. Selecting or activating an employee updates the detail panel beside the list.</p>`;

export const listViewOverviewcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
