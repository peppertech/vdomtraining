import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows a table with sticky columns, to see the behavior scroll the table content horizontally. In this demo the first, third and last columns are sticky. Note that the selector checkbox column always remains sticky at the start.`;

export const tableStickyColumnTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
