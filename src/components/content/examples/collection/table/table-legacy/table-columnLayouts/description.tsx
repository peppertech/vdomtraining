// @ts-nocheck
import 'preact';

export const tableColumnLayoutsDescription = (
  <>
    <p>A table displays data items in a tabular format with highly interactive features.</p>
    <p>This demo shows how the Table's layout attribute and columns[] sizing properties affect the overall display of the Table.</p>
    <br />
    <br />
    <p>layout='contents' :</p>
    <ul>
      <li>When specified, the default column sizing is determined by the contents of the data.</li>
      <li>Does not require an overall width set on the Table.</li>
      <li>Can have performance issues when large numbers of columns and/or rows are initially rendered.</li>
    </ul>
    <br />
    <p>layout='fixed' :</p>
    <ul>
      <li>When specified, the default column sizing is determined by column weights.</li>
      <li>Requires an overall width set on the Table (width='100%', width='200rem', etc.)</li>
      <li>Very performant when rendering large numbers of columns and/or rows.</li>
    </ul>
    <br />
    <p>columns[].width, columns[].minWidth, and columns[].maxWidth :</p>
    <ul>
      <li>Specify the width, minimum width, and maximum width of the column.</li>
      <li>Values do not affect the ability to resize the column.</li>
      <li>All valid CSS sizing strings are supported (20rem, 30%, 10px, etc.)</li>
      <li>If units are not included, values will be interpreted as pixels.</li>
      <li>Apply when both, layout='fixed' and layout='contents'.</li>
    </ul>
    <br />
    <p>columns[].weight :</p>
    <ul>
      <li>Specifies the relative sizing weight of the column.</li>
      <li>Must be a positive number greater than or equal to 1.</li>
      <li>Values do not affect the ability to resize the column.</li>
      <li>Only applies when layout='fixed'.</li>
    </ul>
  </>
);
