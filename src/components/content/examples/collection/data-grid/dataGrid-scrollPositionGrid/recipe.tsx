// @ts-nocheck
import 'preact';

export const dataGridScrollPositionGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Specify the scrollPosition value on the grid. In this case bind it to an observable to maintain
        scrollPosition on refresh and have it update on the change in input values.
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
