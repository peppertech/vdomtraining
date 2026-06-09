import { h } from 'preact';

export const lineChartDefaultDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p>
    <p>
      This demo shows the JET Line Chart. Click the toggle buttons below the chart to change the
      orientation.
    </p>
    <ul>
      <li>
        Line charts are useful for visualizing trends in a set of values over time and comparing these
        values across series.
      </li>
      <li>Recommended for visualizing mixed frequency time data.</li>
      <li>
        Stacking is not recommended for line charts. Instead, consider using stacking on the
        {" "}
        <b>lineWithArea</b> chart type to display cumulative values.
      </li>
    </ul>
  </>
);
