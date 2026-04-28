// @ts-nocheck
import { h } from 'preact';

export const combinationChartDataLabelsDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>
      Chart data labels can be used to highlight important data points. The default position for data
      labels will vary based on the orientation of the chart and the series type.
    </p>
    <ul>
      <li>
        On un-stacked combo charts, setting the label's position to
        <i>'auto'</i>
        on a bar series will act as
        <i>'insideBarEdge'</i>
        .
      </li>
      <li>
        On stacked combo charts, setting the label's position to
        <i>'auto'</i>
        on a bar series will act as
        <i>'center'</i>
        .
      </li>
      <li>
        Setting the label's position to
        <i>'auto'</i>
        on a line or area series will act as
        <i>'afterMarker'</i>
        .
      </li>
      <li>
        Valid label position values on combo charts are
        <i>'auto'</i>
        ,
        <i>'center'</i>
        ,
        <i>'insideBarEdge'</i>
        ,
        <i>'outsideBarEdge'</i>
        ,
        <i>'aboveMarker'</i>
        ,
        <i>'belowMarker'</i>
        ,
        <i>'beforeMarker'</i>
        and
        <i>'afterMarker'</i>
        . If a certain value is not applicable to a series type, that series will set its label
        positions based on its
        <i>'auto'</i>
        behavior.
        <br />
        <i>
          Example: If the label position is set to 'insideBarEdge' but the series is a 'line' type, the
          labels will automatically be positioned 'afterMarker'
        </i>
      </li>
    </ul>
  </>
);
