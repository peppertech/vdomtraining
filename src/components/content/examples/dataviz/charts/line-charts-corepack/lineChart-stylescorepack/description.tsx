import 'preact';

const descriptionHtmlText = String.raw`<p>A line chart displays information graphically using data points connected by straight or curved lines, making relationships among the data easier to understand.</p><p>This demo shows how to add various customization to the line chart series, plot area and axes styles.</p>`;

export const lineChartStylescorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
