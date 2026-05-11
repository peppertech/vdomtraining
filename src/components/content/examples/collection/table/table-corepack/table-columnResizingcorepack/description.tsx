import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows how the Table's column resize behavior attribute affects the overall display of the
Table.
<br />
<br />
columnResizeBehavior='redistribute' :
<ul>
    <li>
        When specified, column resize gestures will affect the width of columns on each side of the
        divider being moved.
    </li>
    <li>
        Works best when a small number of known columns is specified or horizontal overflow is unlikely.
    </li>
</ul>
<br />
columnResizeBehavior='add' :
<ul>
    <li>
        When specified, column resize gestures will only affect the width of a single column.</li>
    <li>Works best when several columns are present or horizontal overflow is likely.</li>
</ul>
<br />
Keyboard column resizing:
Keyboard users can move focus to a column header (using Tab and the arrow keys)
and press Shift+F10 to open the header context menu, when column resizing is available, a 'Resize Column' menu item is shown that opens a dialog to adjust the column width.`;

export const tableColumnResizingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
