import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows how the oj-c-table's layout, columnWidths, and columns sizing attributes affect the overall
display of the  oj-c-table.
<br />
<br />
layout='contents' :
<ul>
  <li>When specified, the default column sizing is determined by the contents of the data.</li>
  <li>Does not require an overall width set on the  oj-c-table.</li>
  <li>
    Can have performance issues when large numbers of columns and/or rows are initially rendered.
  </li>
</ul>
<br />
layout='fixed' :
<ul>
  <li>When specified, the default column sizing is determined by column weights.</li>
  <li>Requires an overall width set on the  oj-c-table (width='100%', width='200rem', etc.)</li>
  <li>Very performant when rendering large numbers of columns and/or rows.</li>
</ul>
<br />
columnWidths, columns[C].minWidth, and columns[C].maxWidth :
<ul>
  <li>Specify the width, minimum width, and maximum width of the column.</li>
  <li>Values accepted for all three properties are numbers interpreted as pixel widths.</li>
  <li>Apply when both, layout='fixed' and layout='contents'.</li>
</ul>
<br />
columns[C].weight :
<ul>
  <li>Specifies the relative sizing weight of the column.</li>
  <li>Must be a positive number greater than or equal to 1.</li>
  <li>Only applies when layout='fixed'.</li>
</ul>`;

export const tableColumnLayoutscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
