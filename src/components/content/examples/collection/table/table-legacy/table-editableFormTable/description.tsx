// @ts-nocheck
import { h } from 'preact';

export const tableEditableFormTableDescription = (
  <>
    <p>A table displays data items in a tabular format with highly interactive features.</p>
    <p>This demo shows how to use form layout in editable table. In certain rows editing has been disabled. It also demonstrates the use case where more fields which are not displayed in visible columns can be edited (e.g. Manager Id, Currency).</p>
    <p>To edit a row, double click on the row, click on the edit icon in the row, or press Enter. Press Enter to submit the edit, or the Esc key to cancel the edit and return to readonly.</p>
    <p>To save changes click on "Update" button or click outside edited row. Click "Cancel" button to revert to original content.</p>
    <p>Editing is handled asynchronously. Use the controls below to simulate validation delay for entering and submitting edits. The Table waits for the validation promise; if inputs are invalid, editing stays active and focus returns to the first invalid field.</p>
  </>
);
