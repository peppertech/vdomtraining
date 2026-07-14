// @ts-nocheck
import 'preact';

export const timelineSelectionDescription = (
  <>
    <p>A timeline is an interactive data visualization that displays a series of events in chronological order.</p><p>The selection feature allows a user to focus on a specific data item by clicking on it.</p>
    <ul>
      <li>
        By default,
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        is set to
        {" "}
        <i>'none'</i>
        {" "}
        and is disabled.
      </li>
      <li>
        When
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        is set to
        {" "}
        <i>'single'</i>
        , only one data item can be selected at a time.
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
        by holding the Ctrl key while clicking on multiple items (the Ctrl key is not needed on touch
        devices). The selection state can be reset by clicking or tapping on the background.
      </li>
    </ul>
  </>
);
