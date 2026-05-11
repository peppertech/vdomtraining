// @ts-nocheck
import { h } from 'preact';

export const tableEditableArrayTableDescription = (
  <>
    <p>A table displays data items in a tabular format with highly interactive features.</p>
    <p>This demo shows inline row editing feature of the table.</p>
    <p>To edit a row, double click on the row or press Enter. Press Enter to submit the edit. Press Esc key to cancel and return to readonly.</p>
    <p>To save changes click on save icon or click outside edited row. Click cancel icon to revert to original content.</p>
    <p>Editing is handled asynchronously. Use the controls below to simulate validation delay for entering and submitting edits. The Table waits for the validation promise; if inputs are invalid, editing stays active and focus returns to the first invalid field.</p>
  </>
);
