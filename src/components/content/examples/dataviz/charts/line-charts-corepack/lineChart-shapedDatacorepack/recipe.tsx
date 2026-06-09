import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an oj-c-line-chart element and set
    <i>
      <b>type</b>: 'line'
    </i>.
  </li>
  <li>
    Supply the data items using the
    <i><b>data</b></i>
    attribute.
  </li>
  <li>
    The data supplied to the MutableArrayDataProvider should be of type
    <a target="_blank" href="jsdocs/oj-c.LineChart.html#LineItem">oj-c-line.LineItem</a>.
  </li>
</ol>`;

export const lineChartShapedDatacorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
