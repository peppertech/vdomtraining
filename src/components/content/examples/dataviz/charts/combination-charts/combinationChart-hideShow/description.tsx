// @ts-nocheck
import { h } from 'preact';

export const combinationChartHideShowDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>
      Hide and show feature allows a user to hide and unhide a series by clicking the chart legend
      markers. This allows the user to focus on specific series that are interesting to them.
    </p>

    <ul>
      <li>By default, the hide and show feature is disabled.</li>
      <li>
        When
        <i><b>hide-and-show-behavior</b></i>
        is set to
        <i>'withRescale'</i>
        , the chart axes will rescale as the minimum and maximum values of the visible data increase or
        decrease. This is useful for series with largely varying values.
      </li>
      <li>
        When
        <i><b>hide-and-show-behavior</b></i>
        is set to
        <i>'withoutRescale'</i>
        , the chart axes will not rescale. This is useful to keep the user stay in context.
      </li>
    </ul>
  </>
);
