// @ts-nocheck
import { h } from 'preact';

export const stockChartStylesRecipe = (
  <>
    <ul>
      <li>
        For stock specific stylings like
        <i>barGapRatio</i>
        ,
        <i>maxBarWidth</i>
        ,
        <i>stockFallingColor</i>
        ,
        <i>stockRangeColor</i>
        ,
        <i>stockRisingColor</i>
        and
        <i>stockVolumeColor</i>
        , use the
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#styleDefaults"}>
          <b><i>style-defaults</i></b>
        </a>
        attribute of the oj-chart element.
      </li>
      <li>
        For styling the chart's plot area, use the
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#plotArea"}>
          <b><i>plot-area</i></b>
        </a>
        attribute of the oj-chart element.
      </li>
      <li>
        The series specific stylings can be applied by adding an
        <a target={"_blank"} href={"jsdocs/oj.ojChartSeries.html"}>oj-chart-series</a>
        element and a
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#seriesTemplate"}>seriesTemplate</a>
        in the oj-chart element.
      </li>
      <li>
        The x-axis, y-axis and y2-axis can be styled using the
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#xAxis"}>
          <b><i>x-axis</i></b>
        </a>
        ,
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#yAxis"}>
          <b><i>y-axis</i></b>
        </a>
        and
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#y2Axis"}>
          <b><i>y2-axis</i></b>
        </a>
        attributes of the oj-chart element respectively.
      </li>
    </ul>
  </>
);
