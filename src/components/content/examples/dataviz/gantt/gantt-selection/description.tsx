// @ts-nocheck
import { h } from 'preact';

export const ganttSelectionDescription = (
  <>
    <p>A gantt displays scheduling information graphically, making it easier to plan, coordinate, and track various tasks and resources.</p><p>The selection feature allows a user to focus on a specific task bar by clicking on it.</p>

    <ul>
      <li>
        By default, Gantt selection is disabled - the
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        attribute is set to
        {" "}
        <i>'none'</i>
      </li>
      <li>
        When
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        is set to
        {" "}
        <i>'single'</i>
        , selection of one task bar is enabled.
      </li>
      <li>
        When
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        is set to
        {" "}
        <i>'multiple'</i>
        , selection of more than one task bar at a time is enabled. On desktop, select multiple tasks by
        holding the Ctrl key.
      </li>
    </ul>
  </>
);
