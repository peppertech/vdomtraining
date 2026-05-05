import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A line chart displays information graphically using data points connected by straight or curved lines, making relationships among the data easier to understand.</p><p>Line type specifies the shape of the data point connectors.</p>`;

export const lineChartLineTypescorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
