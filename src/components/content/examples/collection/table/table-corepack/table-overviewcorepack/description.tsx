import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows an oj-c-table with array data configured to support the following features:
<br />
<ul>
  <li>Selection</li>
  <li>Gridlines</li>
</ul>`;

export const tableOverviewcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
