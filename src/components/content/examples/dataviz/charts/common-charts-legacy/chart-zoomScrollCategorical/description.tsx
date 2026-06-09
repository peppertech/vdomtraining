// @ts-nocheck
import { h } from 'preact';

export const chartZoomScrollCategoricalDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>Zoom and scroll the chart with the following gestures:</p>
    <ul>
      <li>
        Pan scroll the chart by dragging on the plot area. The Y-axis will rescale automatically based
        on the visible data.
      </li>
      <li>
        Use the mouse wheel to zoom in or out. On touch devices, use the two-finger pinch gesture.
      </li>
      <li>Drag horizontally along the X-axis to perform a marquee zoom.</li>
    </ul>
    <p>
      Use the toggle buttons on the left to choose either the
      {" "}
      <b>simple</b>
      {" "}
      or the
      {" "}
      <b>overview</b>
      {" "}
      scrollbar. The overview scrollbar displays an overview of the entire dataset, and you can interact
      with it with the following gestures:
    </p>
    <ul>
      <li>Drag the window or the window handles to scroll or zoom.</li>
      <li>Click on an unselected area to jump to that spot.</li>
    </ul>
    <p>
      Use the toggle buttons on the center to enable or disable
      {" "}
      <b>zooming</b>
      . Disabling zooming is useful when one wants to show a constant viewport size, such as one day or
      one week.
    </p>
    <p>
      Use the toggle buttons on the right to set the
      {" "}
      <b>initial zooming</b>
      . The feature lets the chart automatically zoom into the first or the last data points that can
      fit inside the viewport during the initial render. It ensures that the chart initially displays as
      many data points as possible in the given space, without allowing any axis tick label to be
      skipped.
    </p>
  </>
);
