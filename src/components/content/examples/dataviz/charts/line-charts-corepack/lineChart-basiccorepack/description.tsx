import 'preact';

const descriptionHtmlText = String.raw`<p>A line chart displays information graphically using data points connected by straight or curved lines, making relationships among the data easier to understand.</p><p>This demo shows the JET Line Chart (<a target="_blank" href="jsdocs/oj-c.LineChart.html">oj-c-line-chart</a>) populated with an <a target="_blank" href="jsdocs/MutableArrayDataProvider.html">MutableArrayDataProvider</a> and the <a target="_blank" href="jsdocs/oj-c.LineChart.html#itemTemplate">itemTemplate</a>. You can increase the performance of this component by using shaped data. See the <a href="#" onclick="demoGoLink(event, 'lineChartCorepack', 'shapedData'); return false;">Shaped Data demo</a> for details.</p>`;

export const lineChartBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
