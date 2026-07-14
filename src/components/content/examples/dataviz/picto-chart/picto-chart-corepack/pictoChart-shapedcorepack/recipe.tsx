// @ts-nocheck
import 'preact';

const recipeHtmlText = String.raw`<ul>
    <li>Create an oj-c-picto-chart element.</li>
    <li>
      Supply the data items using the
      <i><b>data</b></i>
      attribute.
    </li>
    <li>
      The data supplied to the MutableArrayDataProvider should be of type
      <a target="_blank" href="jsdocs/oj-c.ojPictoChart.html#Item">ojPictoChart.Item</a>
    </li>
  </ul>`;

export const pictoChartShapedcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
