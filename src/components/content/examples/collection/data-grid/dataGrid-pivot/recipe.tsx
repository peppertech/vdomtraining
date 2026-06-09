// @ts-nocheck
import { h } from 'preact';

export const dataGridPivotRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Create a class that implements the
        {" "}
        <a href={"/jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        {" "}
        interface and set that on the oj-data-grid's data attribute and apply bindings to the grid.
      </li>
      <li>
        Allow pivot via drag and drop by specifying the same dataTypes in the drag and the drop options
        of the header labels on the DataGrid.
      </li>
      <li>Use the dragEnd and drop attributes to register a dragEnd and drop event callback.</li>
      <li>
        Set the cutHeaderLabel subproperty in the dataTransferOptions to "enable" to enable the cut
        context menu item for header labels. Register a cut event handler for tracking header label cut
        via the context menu. This is required for keyboard accessibility.
      </li>
      <li>
        Define a custom oj-menu element as a child of oj-datagrid element to add the insert before and
        insert after context menu items. Add menu action handlers to perform insert operations when the
        user takes a cut/insert action on header labels.
      </li>
      <li>Apply bindings to the datagrid.</li>
      <li>Pivot and reorder header labels by using drag and drop or context menu actions.</li>
    </ol>
  </>
);
