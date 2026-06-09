// @ts-nocheck
import { h } from 'preact';

export const boxPlotMeansRecipe = (
  <>
    <ul>
      <li>
        Create a box plot, and add a seriesTemplate with the
        {" "}
        <i><b>type</b></i>
        {" "}
        attribute evaluating to
        {" "}
        <i>'line'</i>
        {" "}
        in order to display the
        {" "}
        <code>mean</code>
        {" "}
        values with a connector line.
      </li>
      <li>
        Configure other attributes for the 'Mean' series, like
        {" "}
        <i><b>marker-size</b></i>
        ,
        <i><b>marker-shape</b></i>
        {" "}
        or
        {" "}
        <i><b>color</b></i>
        .
      </li>
    </ul>
  </>
);
