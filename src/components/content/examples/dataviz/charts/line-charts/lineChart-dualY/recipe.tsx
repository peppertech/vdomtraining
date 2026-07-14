import 'preact';

export const lineChartDualYRecipe = (
  <>
    <ol>
      <li>
        Assign a series to the second Y-axis by setting the attribute
        {" "}
        <i><b>assigned-to-Y2</b></i>
        {" "}
        to
        {" "}
        <i>'on'</i>
        {" "}
        on the series item. All the other series will be assigned to the first Y-axis.
      </li>
      <li>
        Render Y-axis data and Y2-axis data in separate plot areas by setting the attribute
        {" "}
        <b><i>split-dual-y</i></b>
        {" "}
        to
        {" "}
        <i>'on'</i>
        .
      </li>
      <li>
        When using
        {" "}
        <i>
          <b>split-dual-y</b>
          : 'on'
        </i>
        , adjust the amount of space given to each sub-chart by setting the
        {" "}
        <i><b>splitter-position</b></i>
        {" "}
        attribute.
      </li>
      <li>
        The tick marks of the two Y-axes are aligned by default. Turn off the alignment by setting the
        attribute
        {" "}
        <i><b>y2-axis.align-tick-marks</b></i>
        {" "}
        to
        {" "}
        <i>'off'</i>
        {" "}
        on the chart.
      </li>
    </ol>
  </>
);
