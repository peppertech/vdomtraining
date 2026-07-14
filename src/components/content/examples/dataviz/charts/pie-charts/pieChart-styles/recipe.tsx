// @ts-nocheck
import 'preact';

export const pieChartStylesRecipe = (
  <>
    <ul>
      <li>
        The center content can be added and styled using the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#pieCenter"}>
          <b><i>pie-center</i></b>
        </a>
        {" "}
        attribute of the oj-chart element.
      </li>
      <li>
        For pie specific stylings like
        {" "}
        <i>dataItemGaps</i>
        {" "}
        and
        {" "}
        <i>pieInnerRadius</i>
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
