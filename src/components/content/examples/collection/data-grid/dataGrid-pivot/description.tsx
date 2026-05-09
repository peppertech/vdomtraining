// @ts-nocheck
import { h } from 'preact';

export const dataGridPivotDescription = (
  <>
    <p>A data grid displays data in a cell oriented grid.</p><p>
      This demo shows how to achieve drag and drop events for pivot and level reordering functionality
      in DataGrid. Interact with the header labels by dragging and dropping to achieve pivot and
      reordering. This demo showcases the drag and drop events triggered by the DataGrid while
      performing pivoting and expects the application to build their own aggregation logic to ensure the
      data is passed on to the DataGridProvider on drop. The data used here is a dummy data for
      representation purpose alone as there is not currently an out of the box aggregating
      DataGridProvider.
      <br />
      Note: the data will not change on drop, but you can see the header labels persist.
    </p>
  </>
);
