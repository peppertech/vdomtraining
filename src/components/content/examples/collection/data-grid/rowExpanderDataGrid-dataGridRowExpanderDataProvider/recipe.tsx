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
        In the HTML specify a cell template that adds the row expander to the row header. Use the
        oj.KnockoutTemplateUtils.getRenderer to convert templates to renderers.
      </li>
      <li>
        Create a FlattenedTreeDataProviderView from the ArrayTreeDataProvider and options specific to
        the grid implementation.
      </li>
      <li>Apply bindings to the data grid with the data in the binding.</li>
    </ol>
  </>
);
