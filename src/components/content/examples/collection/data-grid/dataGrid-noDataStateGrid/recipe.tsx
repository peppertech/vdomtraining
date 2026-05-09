// @ts-nocheck
import { h } from 'preact';

export const dataGridNoDataStateGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Use noData slot template element as a child of oj-data-grid for the content to show when there
        is no data. If necessary customize it with interactive elements like buttons etc and in the
        viewModel make sure the necessary functions for interactions are specified.
      </li>
      <li>If noData slot is not specified, a default empty state message will be shown.</li>
      <li>
        Create a class that implements the
        <a href={"/jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        interface and set that on the oj-data-grid's data attribute and apply bindings to the grid.
      </li>
    </ol>
  </>
);
