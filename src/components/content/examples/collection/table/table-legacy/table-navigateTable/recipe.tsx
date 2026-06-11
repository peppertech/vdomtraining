// @ts-nocheck
import { h } from 'preact';

export const tableNavigateTableRecipe = (
  <>
    <ol>
      <li>Use component state to track the active view, current table row and table scroll position.</li>
      <li>Render the table view and detail view conditionally from that state.</li>
      <li>In the table view, configure oj-table to display the department data.</li>
      <li>Use the scroll-position property to capture and restore table scroll position.</li>
      <li>Use the current-row property to capture and restore the current row.</li>
      <li>The detail view displays data for the current row, and returning to the table restores the prior table state.</li>
    </ol>
  </>
);
