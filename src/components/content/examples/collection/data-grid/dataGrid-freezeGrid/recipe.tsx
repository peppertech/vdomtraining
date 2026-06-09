// @ts-nocheck
import { h } from 'preact';

export const dataGridFreezeGridRecipe = (
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
        Enable freezing rows and columns by setting the freezable attribute on the appropriate header
        axis.
      </li>
      <li>
        Use the frozen row/column count properties to freeze an initial number of rows and columns.
      </li>
      <li>Freeze or unfreeze rows/columns via the context menu.</li>
    </ol>
  </>
);
