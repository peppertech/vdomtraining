// @ts-nocheck
import 'preact';

export const pieChartSelectionDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>
      The selection feature allows a user to focus on a specific pie slice by clicking on it. When
      {" "}
      <i><b>selection-mode</b></i>
      {" "}
      is set to
      {" "}
      <i>'single'</i>
      , only one pie slice at a time can be selected. When
      {" "}
      <i><b>selection-mode</b></i>
      {" "}
      is set to
      {" "}
      <i>'multiple'</i>
      , multiple pie slices can be selected at the same time. Hold the Ctrl key while clicking on
      multiple slices (the Ctrl key is not needed on touch devices).
    </p>

    <p>
      There are three
      {" "}
      <b>selection effects</b>
      {" "}
      to choose from for pie charts: highlight, explode, or both.
    </p>
  </>
);
