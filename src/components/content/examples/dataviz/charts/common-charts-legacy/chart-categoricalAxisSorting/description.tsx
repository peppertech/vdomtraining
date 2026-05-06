// @ts-nocheck
import { h } from 'preact';

export const chartCategoricalAxisSortingDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>Sorting is supported for categorical axis charts in either ascending or descending order.</p>
    <ul>
      <li>
        For charts with multiple series, the sort is based on the sum of all the values in the category.
      </li>
      <li>For dual-y charts, only values assigned to the y1 axis are used for the sort.</li>
      <li>
        When there are a large number of categories, consider using
        <b><i>initial-zooming</i></b>
        in conjunction with sorting.
      </li>
    </ul>
  </>
);
