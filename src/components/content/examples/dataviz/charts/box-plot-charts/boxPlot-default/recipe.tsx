// @ts-nocheck
import { h } from 'preact';

export const boxPlotDefaultRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        {" "}
        <i>
          <b>type</b>
          : 'boxPlot'
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
        Make the chart grow horizontally by setting the
        {" "}
        <i><b>orientation</b></i>
        {" "}
        attribute to
        {" "}
        <i>'horizontal'</i>
      </li>
      <li>
        <b>Accessibility</b>
        : In box plotscharts, the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        {" "}
        property in
        {" "}
        <b>oj-chart-item</b>
        {" "}
        attribute is automatically populated with a default descriptor that contains series, group, and
        value information. However it can be explicitly set by the application to provide alternative or
        more detailed information.
      </li>
    </ol>
  </>
);
