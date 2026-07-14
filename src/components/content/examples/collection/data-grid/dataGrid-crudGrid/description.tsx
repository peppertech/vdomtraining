// @ts-nocheck
import 'preact';

export const dataGridCrudGridDescription = (
  <>
    <p>A data grid displays data in a cell oriented grid.</p><p>
      This demo shows how to use
      {" "}
      <code>DataGridProvider</code>
      {" "}
      mutation events to propagate changes in the data to the DataGrid.
    </p>
    <p>
      <code>addEventListener</code>
      {" "}
      and
      {" "}
      <code>removeEventListener</code>
      {" "}
      are two events related methods.
    </p>
    <ul>
      <li>
        <code>addEventListener</code>
        {" "}
        adds a callback function to listen for a specific event type.
      </li>
      <li>
        <code>removeEventListener</code>
        {" "}
        removes a listener previously registered with addEventListener.
      </li>
    </ul>
    <p>
      Events
      {" "}
      <code>add</code>
      ,
      <code>remove</code>
      ,
      <code>update</code>
      {" "}
      and
      {" "}
      <code>refresh</code>
      {" "}
      are used to demo the usage of the above two methods.
    </p>
    <ul>
      <li>
        <code>add</code>
        {" "}
        should be dispatched if rows or columns have been added to the DataGridProvider.
      </li>
      <li>
        <code>remove</code>
        {" "}
        should be dispatched if rows or columns have been removed to the DataGridProvider.
      </li>
      <li>
        <code>update</code>
        {" "}
        should be dispatched if cells have been changed in the DataGridProvider.
      </li>
      <li>
        <code>refresh</code>
        {" "}
        should be dispatched if the DataGridProvider is unable to diff the current version with the
        previous (for example: sort, complex expansion).
      </li>
    </ul>
    <p>
      Try to select a range of cells, enter text in the input control and click 'Update'. Note the cell
      contents in the selection change without re-rendering the entire DataGrid.
    </p>
    <p>
      Try to select a range of entire columns/rows (not a combination of both) and click 'Remove' or
      'Duplicate'. Note the removal or addition of the columns/rows without re-rendering the entire
      DataGrid.
    </p>
    <p>
      Click 'Remove Events' to remove events listener. Try an above mutation on the DataGrid. Note the
      events are not triggered to the text box.
    </p>
    <p>
      Click 'Add Events' to add events listener. Try an above mutation on the DataGrid. Note the events
      are triggered to the text box.
    </p>
  </>
);
