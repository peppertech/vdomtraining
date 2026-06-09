// @ts-nocheck
import { h } from 'preact';

export const pieChartSortingRecipe = (
  <>
    <ol>
      <li>
        On the pie chart, set
        {" "}
        <i><b>sorting</b></i>
        {" "}
        to
        {" "}
        <i>'descending'</i>
        {" "}
        or
        {" "}
        <i>'ascending'</i>
        {" "}
        to enable sorting. A descending sort is recommended for pie charts.
      </li>
      <li>
        Set
        {" "}
        <i><b>other-threshold</b></i>
        {" "}
        to a number between 0 and 1. The number specifies the fraction of the whole pie under which a
        slice would be aggregated into an "Other" slice.
      </li>
      <li>
        Set the color of the "Other" slice using
        {" "}
        <i><b>style-defaults.other-color</b></i>
        {" "}
        attribute.
      </li>
    </ol>
  </>
);
