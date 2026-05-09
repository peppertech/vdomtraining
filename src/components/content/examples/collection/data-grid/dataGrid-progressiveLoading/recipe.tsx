// @ts-nocheck
import { h } from 'preact';

export const dataGridProgressiveLoadingRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Create a class that implements the
        <a href={"/jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        interface and set that on the oj-data-grid's data attribute and apply bindings to the grid.
      </li>
      <li>
        Initialize the scroll-policy and provide user control to change it and render the data grid
        dynamically.
      </li>
      <li>
        If RowDataGridProvider wraps a DataProvider that takes time to fetch data, it will show
        progressive loading indicators.
      </li>
      <li>
        Note that apps should not introduce this artificial delay. It is added only for demo purpose.
      </li>
    </ol>
  </>
);
