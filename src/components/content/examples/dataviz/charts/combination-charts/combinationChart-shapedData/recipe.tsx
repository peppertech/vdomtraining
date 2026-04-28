// @ts-nocheck
import { h } from 'preact';

export const combinationChartShapedDataRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        <i>
          <b>type</b>
          : 'combo'
        </i>
        .
      </li>
      <li>
        Supply the data items using the
        <i><b>data</b></i>
        attribute. See below for an example.
      </li>
      <li>
        The data supplied to the ArrayDataProvider should be of type
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#DataItem"}>ojChart.DataItem</a>
        .
      </li>
      <li>
        Make the chart grow horizontally with
        <i>
          <b>orientation</b>
          : 'horizontal'
        </i>
        attribute.
      </li>
      <li>
        Stack the data items with
        <i>
          <b>stack</b>
          : 'on'
        </i>
        attribute.
      </li>
      <li>
        <b>Accessibility</b>
        : In combination charts, the
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        property in
        <b>oj-chart-item</b>
        is automatically populated with a default descriptor that contains series, group, and value
        information. However it can be explicitly set by the application to provide alternative or more
        detailed information.
      </li>
    </ol>
  </>
);
