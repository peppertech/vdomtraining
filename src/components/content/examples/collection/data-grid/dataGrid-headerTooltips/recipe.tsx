// @ts-nocheck
import { h } from 'preact';

export const dataGridHeaderTooltipsRecipe = (
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
        Using the
        {" "}
        <a href={"/jsdocs/ojDataGrid.html#header.column.description"}>header.column.description</a>
        {" "}
        API, we can provide a function that returns additional information about the header.
      </li>
    </ol>
  </>
);
