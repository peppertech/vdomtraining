// @ts-nocheck
import { h } from 'preact';

export const chartHighlightingRecipe = (
  <>
    <ol>
      <li>
        Set
        {" "}
        <i><b>hover-behavior</b></i>
        {" "}
        on all components that will trigger highlighting to
        {" "}
        <i>'dim'</i>
        .
      </li>
      <li>
        Series ids serve as default
        {" "}
        <i><b>categories</b></i>
        {" "}
        in
        {" "}
        <b>oj-chart</b>
        .
      </li>
      <li>
        Alternatively, set the
        {" "}
        <i><b>categories</b></i>
        {" "}
        attribute on
        {" "}
        <b>oj-chart-series</b>
        ,
        <b>oj-chart-item</b>
        {" "}
        or the legend's
        {" "}
        <b>oj-legend-item</b>
        .
      </li>
      <li>
        Set the
        {" "}
        <i><b>highlighted-categories</b></i>
        {" "}
        on the legend and the charts such that they share the same array. The array can be empty or
        contain category strings to be highlighted on initial render. This value will be overwritten
        when a component in the associated view registers a hover event.
      </li>
    </ol>
  </>
);
