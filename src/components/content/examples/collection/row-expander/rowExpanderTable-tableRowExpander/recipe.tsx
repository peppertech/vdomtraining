// @ts-nocheck
import { h } from 'preact';

export const rowExpanderTableTableRowExpanderRecipe = (
  <>
    <ol>
      <li>Create an oj-table and assign it a meaningful ID.</li>
      <li>
        Specify the
        <code>selection-mode</code>
        attribute with value
        <code>'{'{'}"row": "multiple"{'}'}'</code>
        to enable the checkboxes.
      </li>
      <li>
        In your JavaScript read data from a JSON file. Create a
        <code>ArrayTreeDataProvider</code>
        with the data.
      </li>
      <li>
        Wrap your
        <code>ArrayTreeDataProvider</code>
        with a
        <code>FlattenedTreeDataProviderView</code>
        and feed that to the table implementation.
      </li>
      <li>
        Add the oj-row-expander to the column in your rowTemplate where you want the expand/collapse
        icon and bind it's context.
      </li>
    </ol>
  </>
);
