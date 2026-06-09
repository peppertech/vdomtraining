// @ts-nocheck
import { h } from 'preact';

export const dataGridAlignmentRecipe = (
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
        Initialize the values for the various data regions content alignment and provide user control to
        change them and render the data grid dynamically.
      </li>
    </ol>
  </>
);
