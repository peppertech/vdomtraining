// @ts-nocheck
import { h } from 'preact';

export const rowExpanderDataGridDataGridRowExpanderDataProviderRecipe = (
  <>
    <ol>
      <li>
        Create an oj-data-grid element and assign it a meaningful ID and specify properties on the
        oj-data-grid.
      </li>
      <li>
        Specify a cell renderer that adds the row expander to the region/state column.
      </li>
      <li>
        Create a FlattenedTreeDataProviderView from an ArrayTreeDataProvider backed by hierarchical
        region and state data.
      </li>
      <li>Add a pivot button that switches between the region/state hierarchy and a decade/year view.</li>
      <li>Apply bindings to the data grid with the data in the binding.</li>
    </ol>
  </>
);
