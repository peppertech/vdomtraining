// @ts-nocheck
import 'preact';

export const dataGridStylingGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Specify the appropriate attributes on the oj-data-grid elements. Use a
        {" "}
        <a href={"/jsdocs/oj.ojDataGrid.html#cellTemplate"}>cellTemplate</a>
        {" "}
        to render the cell content you desire.
      </li>
      <li>Create custom style functions for aligning text and setting header widths.</li>
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
