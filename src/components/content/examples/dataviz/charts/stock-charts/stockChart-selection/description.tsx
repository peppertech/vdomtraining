// @ts-nocheck
import 'preact';

export const stockChartSelectionDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>The selection feature allows a user to focus on a specific data point by clicking on it.</p>

    <ul>
      <li>By default, the selection feature is disabled.</li>
      <li>
        When
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        is set to
        {" "}
        <i>'single'</i>
        , only one data item at a time can be selected.
      </li>
      <li>
        When
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        is set to
        {" "}
        <i>'multiple'</i>
        , multiple data items can be selected at the same time. In this mode, you can perform selection
        by drawing a marquee (a bounding box) around the items you wish to select. Alternatively, hold
        the Ctrl key while clicking on multiple items (the Ctrl key is not needed on touch devices).
      </li>
    </ul>
  </>
);
