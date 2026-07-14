// @ts-nocheck
import 'preact';

export const thematicMapSelectionDescription = (
  <>
    <p>A thematic map is an interactive data visualization that displays data corresponding to geographic locations or regions.
                 Applications are required to supply a mapProvider for a valid thematic map.</p><p>
      The
      {" "}
      <code>selection-mode</code>
      {" "}
      attribute allows a user to focus on a specific data point by clicking on it.
    </p>

    <ul>
      <li>
        By default,
        {" "}
        <code>selection-mode</code>
        {" "}
        is 'none'.
      </li>
      <li>
        When
        {" "}
        <code>selection-mode</code>
        {" "}
        is set to
        {" "}
        <i>'single'</i>
        , only one data item at a time can be selected.
      </li>
      <li>
        When
        {" "}
        <code>selection-mode</code>
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
