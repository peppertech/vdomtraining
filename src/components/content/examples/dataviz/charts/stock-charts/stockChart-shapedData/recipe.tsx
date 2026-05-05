// @ts-nocheck
import { h } from 'preact';

export const stockChartShapedDataRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        <i>
          <b>type</b>
          : 'stock'
        </i>
        .
      </li>
      <li>
        Supply the data items using the
        <i><b>data</b></i>
        attribute. Note that stock charts only support a single series.
      </li>
      <li>
        The data supplied to the ArrayDataProvider should be of type
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#Item"}>ojChart.Item</a>
        .
      </li>
      <li>
        Specify the series
        <i><b>type</b></i>
        in order to customize the chart. The
        <i><b>candlestick</b></i>
        is recommended when detailed information (open, high, low, and close values) for a time period
        is desired.
      </li>
    </ol>
  </>
);
