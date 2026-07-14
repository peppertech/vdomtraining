// @ts-nocheck
import 'preact';

export const tableColumnResizingDescription = (
  <>
    <p>A table displays data items in a tabular format with highly interactive features.</p>
    <p>This demo shows how the Table's column resize behavior attribute affects the overall display of the Table.</p>
    <br />
    <br />
    <p>columnResizeBehavior='redistribute' :</p>
    <ul>
      <li>When specified, column resize gestures will affect the width of columns on each side of the divider being moved. Performing a column resize gesture via drag and drop will not affect the total width of all columns in the Table.</li>
      <li>Works best when a small number of known columns is specified or horizontal overflow is unlikely.</li>
    </ul>
    <br />
    <p>columnResizeBehavior='add' :</p>
    <ul>
      <li>When specified, column resize gestures will only affect the width of a single column. Performing a column resize gesture via drag and drop will increase or decrease the total width of all columns in the Table by the resize amount.</li>
      <li>Works best when several columns are present or horizontal overflow is likely.</li>
    </ul>
    <br />
    <p>Keyboard column resizing: Keyboard users can move focus to a column header (using Tab and the arrow keys) and press Shift+F10 to open the header context menu, when column resizing is available, a 'Resize Column' menu item is shown that opens a dialog to adjust the column width.</p>
  </>
);
