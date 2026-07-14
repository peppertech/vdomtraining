// @ts-nocheck
import 'preact';

export const dataGridFilterGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>Specify the appropriate attributes on the oj-data-grid element.</li>
      <li>
        Define an oj-popup element containing a Redwood compliant filter in your HTML and add logic to
        open popup in ojFilterRequest handler
      </li>
      <li>
        Initialize the RowDataGridProvider with a ListDataProviderView that is capable of supporting
        filterCriterion.
      </li>
      <li>In the popup close listener, update the filterCriterion on the ListDataProviderView.</li>
    </ol>
  </>
);
