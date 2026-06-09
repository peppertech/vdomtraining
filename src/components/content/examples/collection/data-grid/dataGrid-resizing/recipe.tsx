// @ts-nocheck
import { h } from 'preact';

export const dataGridResizingRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Enable the appropriate resizable attributes on the oj-data-grid element for both the column and
        row headers.
      </li>
      <li>
        Create a class that implements the
        {" "}
        <a href={"/jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        {" "}
        interface and set that on the oj-data-grid's data attribute and apply bindings to the grid.
      </li>
    </ol>
  </>
);
