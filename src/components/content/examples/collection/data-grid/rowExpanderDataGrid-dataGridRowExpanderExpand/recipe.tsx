// @ts-nocheck
import { h } from 'preact';

export const rowExpanderDataGridDataGridRowExpanderExpandRecipe = (
  <>
    <ol>
      <li>
        Create an oj-data-grid element and assign it a meaningful ID and specify properties on the
        oj-data-grid.
      </li>
      <li>
        In the HTML specify a row header template that adds the row expander to the row header. Use the
        oj.KnockoutTemplateUtils.getRenderer to convert templates to renderers.
      </li>
      <li>In your JavaScript read data from a JSON file. Create a JSONTreeDataSource with the data.</li>
      <li>Create a FlattenedTreeDataGridDataSource from the JSONTreeDataSource.</li>
      <li>
        In the expanded case specify the expanded option on the FlattenedTreeDataGridDataSource to be an
        array of keys to be initially expanded.
      </li>
      <li>Apply bindings to the data grid with the data in the binding.</li>
    </ol>
  </>
);
