// @ts-nocheck
import { h } from 'preact';

export const chartFilteringRecipe = (
  <>
    <ol>
      <li>
        Set
        <i><b>hide-and-show-behavior</b></i>
        on the legend component to
        <i>'on'</i>
        .
      </li>
      <li>
        Series ids serve as default
        <i><b>categories</b></i>
        in
        <b>oj-chart</b>
        .
      </li>
      <li>
        Alternatively, set the
        <i><b>categories</b></i>
        attribute on
        <b>oj-chart-series</b>
        ,
        <b>oj-chart-item</b>
        or the legend's
        <b>oj-legend-item</b>
        .
      </li>
      <li>
        To filter items on initial render, set the
        <i><b>hidden-categories</b></i>
        array on each associated component.
      </li>
    </ol>
  </>
);
