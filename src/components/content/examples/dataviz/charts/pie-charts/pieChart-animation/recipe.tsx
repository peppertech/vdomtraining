// @ts-nocheck
import 'preact';

export const pieChartAnimationRecipe = (
  <>
    <ol>
      <li>
        Set
        {" "}
        <i><b>animation-on-display</b></i>
        {" "}
        to
        {" "}
        <i>'auto'</i>
        {" "}
        to enable initial display animation.
      </li>
      <li>
        Set
        {" "}
        <i><b>animation-on-data-change</b></i>
        {" "}
        to
        {" "}
        <i>'auto'</i>
        {" "}
        to enable data change animation.
      </li>
      <li>
        Set
        {" "}
        <i><b>pie-slice-explode</b></i>
        {" "}
        on
        {" "}
        <b>oj-chart-series</b>
        {" "}
        to a decimal between 0 and 1 to enable the slice explosion animation.
      </li>
    </ol>
  </>
);
