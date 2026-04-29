// @ts-nocheck
import { h } from 'preact';

export const pictoChartCustomImagesRecipe = (
  <>
    <ul>
      <li>
        Pass the image path into the
        <i><b>source</b></i>
        attribute of the
        <i><b>items</b></i>
        for the PictoChart.
      </li>
      <li>
        To specify a color for the tooltips, set the
        <i><b>color</b></i>
        attribute on
        <i><b>items</b></i>
        .
      </li>
      <li>
        If using selection,
        <b><i>source-selected</i></b>
        ,
        <b><i>source-hover</i></b>
        and
        <b><i>source-hover-selected</i></b>
        attributes of
        <b>oj-picto-chart-item</b>
        specify the images for the selected and hover states.
      </li>
    </ul>
  </>
);
