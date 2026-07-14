import 'preact';

const descriptionHtmlText = String.raw`<p>A line chart displays information graphically using data points connected by straight or curved lines, making relationships among the data easier to understand.</p><p>
  This demo shows the JET line chart with dual Y-axis. Dual-Y charts are useful for conveying
  relationships between series data that use different units or magnitudes of measurement.
</p>`;

export const lineChartDualYcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
