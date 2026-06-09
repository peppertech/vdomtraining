// @ts-nocheck
import { h } from 'preact';

export const chartCustomImagesRecipe = (
  <>
    <ol>
      <li>
        Pass the image path into the
        {" "}
        <i><b>source</b></i>
        {" "}
        attribute of the
        {" "}
        <b>oj-chart-series</b>
        {" "}
        or
        {" "}
        <b>oj-chart-item</b>
        {" "}
        for the Chart.
      </li>
      <li>
        To specify a color for the tooltips, set the
        {" "}
        <i><b>color</b></i>
        {" "}
        attribute on
        {" "}
        <b>oj-chart-series</b>
        {" "}
        or
        {" "}
        <b>oj-chart-item</b>
        .
      </li>
      <li>
        If using selection, the
        {" "}
        <b><i>source-selected</i></b>
        ,
        <b><i>source-hover</i></b>
        {" "}
        and
        {" "}
        <b><i>source-hover-selected</i></b>
        {" "}
        specify the images for the selected and hover states.
      </li>
    </ol>
  </>
);
