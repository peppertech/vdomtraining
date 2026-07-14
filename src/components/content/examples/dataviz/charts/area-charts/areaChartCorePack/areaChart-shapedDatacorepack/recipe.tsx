import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an oj-c-area-chart element and set
    <i>
      <b>type</b>: 'area'
    </i>.
  </li>
  <li>
    Supply the data items using the
    <i><b>data</b></i>
    attribute.
  </li>
  <li>
    The data supplied to the MutableArrayDataProvider should be of type
    <a target="_blank" href="jsdocs/oj-c.AreaChart.html#AreaItem">oj-c-area-chart.AreaItem</a>.
  </li>
</ol>`;

export const areaChartShapedDatacorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
