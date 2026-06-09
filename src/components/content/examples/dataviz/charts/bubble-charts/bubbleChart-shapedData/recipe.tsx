// @ts-nocheck
import { h } from 'preact';

export const bubbleChartShapedDataRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        {" "}
        <i>
          <b>type</b>
          : 'bubble'
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
      <li>
        <b>Accessibility</b>
        : In bubble charts, the
        {" "}
        <i><b>short-desc</b></i>
        {" "}
        is automatically populated with a default descriptor that contains series, group, and x, y, and
        z information. However,
        {" "}
        <i><b>short-desc</b></i>
        {" "}
        can be explicitly set by the application to provide alternative or more detailed information.
      </li>
    </ol>
  </>
);
