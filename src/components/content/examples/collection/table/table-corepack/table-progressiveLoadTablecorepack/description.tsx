import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows the progressive loading indicator of oj-c-table when the data provider fetch takes longer than a certain time.`;

export const tableProgressiveLoadTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
