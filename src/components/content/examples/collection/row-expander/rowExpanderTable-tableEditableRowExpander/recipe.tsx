// @ts-nocheck
import { h } from 'preact';

export const rowExpanderTableTableEditableRowExpanderRecipe = (
  <>
    <ol>
      <li>Create an oj-table and assign it a meaningful ID.</li>
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
      <li>Set the editMode option to 'rowEdit'.</li>
      <li>
        Create two row templates, one for rows when read-only and the other for rows when editable.
      </li>
      <li>
        The columns in oj-table size to content. Therefore, to prevent flicker when a row switches from
        read-only to editable (the dimensions of the cell contents will most likely be different in
        read-only and editable mode) make sure you specify min-width/width/max-width for your cell and
        header styling.
      </li>
    </ol>
  </>
);
