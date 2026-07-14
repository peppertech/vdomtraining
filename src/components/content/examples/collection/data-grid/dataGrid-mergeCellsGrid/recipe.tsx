// @ts-nocheck
import 'preact';

export const dataGridMergeCellsGridRecipe = (
  <>
    <ol>
      <li>
        Create a class that implements the
        {" "}
        <a href={"jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        {" "}
        interface and set an instance of that class on the oj-data-grid's data attribute and apply
        bindings to the grid.
      </li>
      <li>
        In your custom datagrid provider's implementation change the row, column and cell extent for
        desired rows/columns/cells which are passed as parameter values to the constructor.
      </li>
    </ol>
  </>
);
