// @ts-nocheck
import { h } from 'preact';

export const rowExpanderDataGridVirtualRowExpanderRecipe = (
  <>
    <ol>
      <li>
        Create an oj-data-grid element and assign it a meaningful ID and specify properties on the
        oj-data-grid.
      </li>
      <li>In the HTML specify a row header template that adds the row expander to the row header.</li>
      <li>
        In your JavaScript read data from a JSON file. Create a CollectionTreeDataSource with the data
        and specify function callbacks for getting child collections.
      </li>
      <li>
        Optionally specify a parseMetadata function on the CollectionTreeDataSource to add additional
        information not present in the data.
      </li>
      <li>
        Create a FlattenedTreeDataGridDataSource from the CollectionTreeDataSource and options specific
        to the grid implementation.
      </li>
      <li>Apply bindings to the data grid with the data in the binding.</li>
    </ol>
  </>
);
