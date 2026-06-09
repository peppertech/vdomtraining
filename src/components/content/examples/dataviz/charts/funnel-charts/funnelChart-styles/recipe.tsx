// @ts-nocheck
import { h } from 'preact';

export const funnelChartStylesRecipe = (
  <>
    <ul>
      <li>
        For funnel specific stylings like
        {" "}
        <i>dataItemGaps</i>
        ,
        <i>funnelBackgroundColor</i>
        {" "}
        and
        {" "}
        <i>dataLabelPosition</i>
        , use the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#styleDefaults"}>
          <b><i>style-defaults</i></b>
        </a>
        {" "}
        attribute of the oj-chart element.
      </li>
      <li>
        The series specific stylings can be applied by adding an
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChartSeries.html"}>oj-chart-series</a>
        {" "}
        element and a
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#seriesTemplate"}>seriesTemplate</a>
        {" "}
        in the oj-chart element.
      </li>
    </ul>
  </>
);
