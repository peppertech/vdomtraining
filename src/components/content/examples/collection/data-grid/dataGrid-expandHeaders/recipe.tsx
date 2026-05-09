// @ts-nocheck
import { h } from 'preact';

export const dataGridExpandHeadersRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Create a class that implements the
        <a href={"jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        interface and set an instance of that class on the oj-data-grid's data attribute and apply
        bindings to the grid.
      </li>
      <li>
        Note: This data grid provider is just a sample for demo purpose. Users need to implement their
        own custom data grid for their apps.
      </li>
      <li>
        In the data grid provider's instance return the values required for the GridHeaderItem in
        fetchByOffset method
      </li>
      <li>
        Use header templates and styles to specify header style classes for different screen sizes
      </li>
    </ol>
  </>
);
