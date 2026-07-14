// @ts-nocheck
import 'preact';

export const ganttValueFormatsDescription = (
  <>
    <p>A gantt displays scheduling information graphically, making it easier to plan, coordinate, and track various tasks and resources.</p><p>
      JET Gantt supports formatting of tooltip labels, as well as the ability to customize which values
      are displayed.
    </p>
    <p>Mouse hovering, mobile tap and hold, or keyboard navigating to a task brings up a tooltip.</p>
    <p>
      The form below maps to the
      {" "}
      <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#valueFormats"}>value-formats</a>
      {" "}
      API for customizing the default tooltip:
    </p>
    <ul>
      <li>Check or uncheck the checkboxes to control which fields are displayed in the tooltip.</li>
      <li>Modify the text fields to control the displayed label in the tooltip.</li>
    </ul>
    <p><i>Note : Baseline Date and Date is associated with milestones.</i></p>
  </>
);
