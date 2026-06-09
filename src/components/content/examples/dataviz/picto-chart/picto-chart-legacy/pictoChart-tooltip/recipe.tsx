// @ts-nocheck
import { h } from 'preact';

export const pictoChartTooltipRecipe = (
  <>
    <ol>
      <li>
        Create a tooltip function that takes a
        {" "}
        <i>dataContext</i>
        {" "}
        argument. The
        {" "}
        <i>dataContext</i>
        {" "}
        contains information on the hovered item, including
        {" "}
        <i>id</i>
        ,
        <i>count</i>
        ,
        <i>color</i>
        {" "}
        and
        {" "}
        <i>name</i>
        . It also contains the tooltip
        {" "}
        <i>parentElement</i>
        , which the function can modify directly. The function should construct and return the desired
        tooltip string or a DOM element.
      </li>
      <li>
        Pass the function to the pictoChart
        {" "}
        <b><i>tooltip.renderer</i></b>
        {" "}
        attribute. The pictoChart will then call the function on hover to generate the tooltip and
        append the returned object to itself.
      </li>
      <li>
        If additional data is shown in the tooltip, the application must also override the data item
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        {" "}
        of
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#Item"}>
          <b>oj-picto-chart-item</b>
        </a>
        {" "}
        for accessibility users.
      </li>
    </ol>
  </>
);
