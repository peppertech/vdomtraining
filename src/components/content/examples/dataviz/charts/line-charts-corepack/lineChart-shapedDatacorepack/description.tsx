import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A line chart displays information graphically using data points connected by straight or curved lines, making relationships among the data easier to understand.</p><p>
  This demo shows how to create a JET Line Chart with a dataProvider that contains data that has
  already been shaped for the chart.
</p>`;

export const lineChartShapedDatacorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
