// @ts-nocheck
import { h } from 'preact';

export const dataGridSelectionBasedGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>Specify the appropriate attributes on the oj-data-grid elements.</li>
      <li>
        Create a class that implements the
        <a href={"jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        interface and set an instance of that class on the oj-data-grid's data attribute and apply
        bindings to the grid.
      </li>
      <li>
        On selections made to the row/cell in the datagrid, events shall be triggered; that contains
        information about selected row/cell index.
      </li>
    </ol>
  </>
);
