// @ts-nocheck
import 'preact';

export const dataGridHideAxisGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Create a class that implements the
        {" "}
        <a href={"jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        {" "}
        interface and set an instance of that class on the oj-data-grid's data attribute and apply
        bindings to the grid.
      </li>
      <li>
        Enable hide/show end user functionality via the header.column.hidable attribute on the
        oj-data-grid element.
      </li>
      <li>To hide columns by default, use the hidden-columns attribute on the oj-data-grid element.</li>
    </ol>
  </>
);
