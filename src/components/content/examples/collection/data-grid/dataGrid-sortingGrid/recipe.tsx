// @ts-nocheck
import { h } from 'preact';

export const dataGridSortingGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Specify the appropriate attributes on the oj-data-grid element including the
        {" "}
        <code>on-oj-sort-request</code>
        {" "}
        event handler.
      </li>
      <li>
        Create a class that implements the
        {" "}
        <a href={"/jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        {" "}
        interface with the capability to handle changes in sort order and pass back header/headerLabel
        sort information in header/headerLabel results and set that on the oj-data-grid's data attribute
        and apply bindings to the grid.
      </li>
      <li>
        Dispatch a
        {" "}
        <code>DataGridProviderRefreshEvent</code>
        {" "}
        after the correct sort is ready to be fetched from the DataGridProvider.
      </li>
    </ol>
  </>
);
