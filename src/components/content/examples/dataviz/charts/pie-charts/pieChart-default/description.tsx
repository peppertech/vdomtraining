// @ts-nocheck
import { h } from 'preact';

export const pieChartDefaultDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>
      This demo shows the JET Pie Chart. Click the toggle buttons below the chart to switch between 2D
      and 3D.
    </p>
    <ul>
      <li>
        Pie charts are useful for visualizing parts of a whole, but do not display zero or negative
        values so they are not recommended for data sets that may have negative or null data.
      </li>
      <li>
        When multiple small values exist, consider using the "Other" slice feature by setting the
        <a href={"jsdocs/oj.ojChart.html#otherThreshold"}>other-threshold</a>
        attribute.
      </li>
      <li>Sorting is recommended when there is no natural ordering between the slices.</li>
    </ul>
  </>
);
