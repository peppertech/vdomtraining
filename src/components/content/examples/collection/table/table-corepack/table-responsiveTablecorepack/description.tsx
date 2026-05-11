import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows how to responsively add or drop columns in the oj-c-table depending on the browser screen size.`;

export const tableResponsiveTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
