import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or grid with interactive collection features.</p>
<p>This overview shows an oj-c-list-view backed by a MutableArrayDataProvider. It combines item action, required single selection, edit-mode multi-selection, simple CRUD controls, and custom no-data content in one standalone demo.</p>`;

export const listViewOverviewcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
