// @ts-nocheck
import { h } from 'preact';

export const barChartShapedDataRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        {" "}
        <i>
          <b>type</b>
          : 'bar'
        </i>
        .
      </li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>data</b></i>
        {" "}
        attribute.
      </li>
      <li>
        The data supplied to the ArrayDataProvider should be of type
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#DataItem"}>ojChart.DataItem</a>
        .
      </li>
    </ol>
  </>
);
