// @ts-nocheck
import 'preact';

export const chartDrillingEventsDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>Click on the chart items to generate a drill event. Choose from the following options:</p>
    <ul>
      <li>
        <b><i>off</i></b>
        : disable drilling
      </li>
      <li>
        <b><i>groupsOnly</i></b>
        : enable drilling on the x-axis labels
      </li>
      <li>
        <b><i>seriesOnly</i></b>
        : enable drilling on the legend items
      </li>
      <li>
        <b><i>on</i></b>
        : enable drilling on the x-axis labels (groups), legend items (series), and bars (data items).
      </li>
    </ul>
    <p>
      Enable
      {" "}
      <i>multi-series-drilling</i>
      {" "}
      to allow drilling on objects with multi series objects. e.g. other slice and legend item in pie
      charts.
    </p>
    <p>
      If selection is turned on, drilling can be done by double clicking. The single click gesture will
      be reserved for selection.
    </p>
  </>
);
