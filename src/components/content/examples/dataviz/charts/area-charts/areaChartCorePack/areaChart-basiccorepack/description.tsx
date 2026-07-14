import 'preact';

const descriptionHtmlText = String.raw`<p>An area chart displays information graphically using lines and filled areas, making relationships among the data easier to understand.</p><p>This demo shows the JET Area Chart (<a target="_blank" href="jsdocs/oj-c.AreaChart.html">oj-c-area-chart</a>) populated with an <a target="_blank" href="jsdocs/MutableArrayDataProvider.html">MutableArrayDataProvider</a> and the <a target="_blank" href="jsdocs/oj-c.AreaChart.html#itemTemplate">itemTemplate</a>. You can increase the performance of this component by using shaped data. See the <a href="#" onclick="demoGoLink(event, 'areaChartCorepack', 'shapedData'); return false;">Shaped Data demo</a> for details.</p>
<ul>
    <li>
        Area charts are useful for comparing trends of cumulative values over time, such as breakdowns of sales trends.
    </li>
    <li>
        When multiple series are shown stacking is recommended to prevent values from being obscured.
    </li>
</ul>`;

export const areaChartBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
