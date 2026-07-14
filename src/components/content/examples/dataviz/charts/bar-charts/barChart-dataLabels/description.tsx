// @ts-nocheck
import 'preact';

export const barChartDataLabelsDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>
      Chart data labels can be used to highlight important data points. The default position for data
      labels will vary based on the orientation of the chart.
    </p>
    <ul>
      <li>
        On un-stacked bar charts, setting the label's position to
        {" "}
        <i>'auto'</i>
        {" "}
        will act as
        {" "}
        <i>'insideBarEdge'</i>
        .
      </li>
      <li>
        On stacked bar charts, setting the label position to
        {" "}
        <i>'auto'</i>
        {" "}
        will act as
        {" "}
        <i>'center'</i>
        .
      </li>
      <li>
        On stacked bar charts, setting the
        {" "}
        <b><i>stack-label</i></b>
        {" "}
        attribute to
        {" "}
        <i>'on'</i>
        {" "}
        will add the total value of stacks to the top.
      </li>
      <li>
        Valid label position values on bar charts are
        {" "}
        <i>'auto'</i>
        ,
        <i>'center'</i>
        ,
        <i>'insideBarEdge'</i>
        ,
        <i>'outsideBarEdge'</i>
        {" "}
        and
        {" "}
        <i>'none'</i>
        .
      </li>
      <li>
        For stack-label
        {" "}
        <i>'on'</i>
        , consider setting the
        {" "}
        <b><i>y-axis.tick-label.rendered</i></b>
        {" "}
        attribute to
        {" "}
        <i>'off'</i>
        .
      </li>
    </ul>
  </>
);
