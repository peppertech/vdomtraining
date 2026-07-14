import 'preact';

export const ganttDrillTimeAxisDescription = (
  <>
    <p>
      A gantt displays scheduling information graphically, making it easier to plan, coordinate,
      and track various tasks and resources.
    </p>
    <p>
      This demo shows the JET Gantt component with time axis drilling functionality. The initial
      view shows a weekly employee schedule, where users can drill into the minor axis labels to
      reveal a more detailed daily schedule. In the daily view, the major axis labels are
      drillable, which allow users to navigate back to the weekly view.
    </p>
    <ul>
      <li>Mouse or Touch: Click or Tap the desired time axis label to drill.</li>
      <li>
        Keyboard: If focus is on a task, use Alt + UpArrow to navigate to the nearest time axis
        label. Use LeftArrow and RightArrow to navigate between time axis labels. Use Enter to
        drill. To move focus back to a task, use Alt + DownArrow.
      </li>
    </ul>
  </>
);
