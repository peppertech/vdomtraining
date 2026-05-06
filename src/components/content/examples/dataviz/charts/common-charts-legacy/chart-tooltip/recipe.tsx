// @ts-nocheck
import { h } from 'preact';

export const chartTooltipRecipe = (
  <>
    <ol>
      <li>
        Create a tooltip function that takes a
        <i>dataContext</i>
        argument. The
        <i><a target={"_blank"} href={"jsdocs/oj.ojChart.html#TooltipContext"}>dataContext</a></i>
        contains information on the hovered item, including
        <i>id</i>
        ,
        <i>series</i>
        ,
        <i>group</i>
        ,
        <i>value</i>
        ,
        <i>data</i>
        ,
        <i>itemData</i>
        ,
        <i>seriesData</i>
        ,
        <i>groupData</i>
        ,
        <i>color</i>
        and
        <i>component</i>
        . It also contains the tooltip
        <i>parentElement</i>
        , which the function can modify directly. The function should construct and return the desired
        tooltip string or a DOM element.
      </li>
      <li>
        Pass the function to the chart
        <b><i>tooltip.renderer</i></b>
        attribute. The chart will then call the function on hover to generate the tooltip and append the
        returned object to itself.
      </li>
      <li>
        If additional data is shown in the tooltip, the application must also set the
        <b>oj-chart-item's</b>
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        for accessibility users.
      </li>
    </ol>
  </>
);
