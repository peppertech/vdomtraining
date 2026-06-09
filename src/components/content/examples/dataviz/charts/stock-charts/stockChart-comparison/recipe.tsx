// @ts-nocheck
import { h } from 'preact';

export const stockChartComparisonRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart and set
        {" "}
        <i>
          <b>type</b>
          : 'stock'
        </i>
        .
      </li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>data</b></i>
        {" "}
        attribute. Note that stock charts only support a single series.
      </li>
      <li>
        Supply the reference objects using the
        {" "}
        <i><b>y-axis.reference-objects</b></i>
        {" "}
        attribute.
      </li>
      <li>
        Create a custom tooltip to display relevant information using the
        {" "}
        <b><i>tooltip.renderer</i></b>
        {" "}
        attribute. Instructions on how to create custom tooltips can be found here:
        {" "}
        <a href={"#"}>
          Tooltip Customization Demo
        </a>
      </li>
      <li>
        If additional data is shown in the tooltip, the application must also override the data item
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        {" "}
        property for accessibility users.
      </li>
    </ol>
  </>
);
