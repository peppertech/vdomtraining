import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    For specific stylings, use the 
    <a target="_blank" href="jsdocs/oj-c.LineChartSeries.html">oj-c-line-chart-series</a>
    element and a
    <a target="_blank" href="jsdocs/oj-c.LineChart.html#LineChartSeries">seriesTemplate</a>
    in the <a target="_blank" href="jsdocs/oj-c.LineChart.html">oj-c-line-chart</a> element.
  </li>
  <li>
    For plot area styling, use the
    <a target="_blank" href="jsdocs/oj-c.LineChart.html#plotArea">
      <b><i>plot-area</i></b>
    </a>
    attribute of the <a target="_blank" href="jsdocs/oj-c.LineChart.html">oj-c-line-chart</a> element.
  </li>
  <li>
    For x-axis and y-axis styling, use the
    <a target="_blank" href="jsdocs/oj-c.LineChart.html#xAxis">
      <b><i>x-axis</i></b>
    </a>
    and
    <a target="_blank" href="jsdocs/oj-c.LineChart.html#yAxis">
      <b><i>y-axis</i></b>
    </a>
    attributes of the <a target="_blank" href="jsdocs/oj-c.LineChart.html">oj-c-line-chart</a> element respectively.
  </li>
</ul>`;

export const lineChartStylescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
