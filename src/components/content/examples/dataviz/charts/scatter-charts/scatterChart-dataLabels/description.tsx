// @ts-nocheck
import { h } from 'preact';

export const scatterChartDataLabelsDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>This demo shows how to use data labels to highlight important data points.</p>
    <ul>
      <li>
        Setting the label's position to
        {" "}
        <i>'auto'</i>
        {" "}
        will act as
        {" "}
        <i>'afterMarker'</i>
        .
      </li>
      <li>
        Setting the data label collision to
        {" "}
        <i>'fitInBounds'</i>
        {" "}
        will adjust the labels to be in the bounds of the chart's plot area and avoid overlapping with
        the chart's major axes or legend.
      </li>
      <li>
        Setting the resolve label overlap to
        {" "}
        <i>'on'</i>
        {" "}
        readjusts the position of the data labels in order to minimize the overlapping labels. Chart
        will not reposition labels whose label-position is defined in either item (via
        {" "}
        <i>oj-chart-item</i>
        {" "}
        ) or series level (via
        {" "}
        <i>oj-chart-seies</i>
        {" "}
        ). Due to finite space, some data labels might still overlap when resolve-label-overlap is set
        to
        {" "}
        <i>'on'</i>
        .
      </li>
      <li>
        Overlapping labels can be hidden by setting hide-overlapping-labels to
        {" "}
        <i>'on'</i>
        , independent of whether resolve-label-overlap is turned on or off.
      </li>
      <li>
        <i>'center'</i>
        {" "}
        label position should not be used when hide-overlapping-labels is set to 'on' as this will cause
        all labels to be removed due to overlap with the marker.
      </li>
    </ul>
  </>
);
