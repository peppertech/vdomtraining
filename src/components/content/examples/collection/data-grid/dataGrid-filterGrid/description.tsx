// @ts-nocheck
import 'preact';

export const dataGridFilterGridDescription = (
  <>
    <p>A data grid displays data in a cell oriented grid.</p><p>
      This demo shows how to implement column level filtering on a DataGrid. Filter icons are rendered
      and trigger gestures are handled internally by the DataGrid component. The application should
      respond to the ojFilterRequest event fired by the DataGrid to launch a filter popup that complies
      with the Redwood specification. Applications should trigger a DataGridProvider refresh event once
      the DataGridProvider has been updated to return filtered data on a subsequent fetchByOffset call.
    </p>
  </>
);
