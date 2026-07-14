// @ts-nocheck
import 'preact';

export const pieChartDataLabelsDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>
      Pie chart data labels can be used to display the values of the slices or to show the series names
      without using a legend. The default position for data labels will vary based on the space
      available.
    </p>
    <ul>
      <li>
        Setting the label position to
        {" "}
        <i>'auto'</i>
        {" "}
        will place the labels inside the slices if they fit or outside if they don't.
      </li>
      <li>
        Valid label position values on pie charts are
        {" "}
        <i>'auto'</i>
        ,
        <i>'outsideSlice'</i>
        ,
        <i>'center'</i>
        , and
        {" "}
        <i>'none'</i>
        .
      </li>
    </ul>
  </>
);
