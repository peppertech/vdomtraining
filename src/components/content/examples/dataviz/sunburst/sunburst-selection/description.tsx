// @ts-nocheck
import 'preact';

export const sunburstSelectionDescription = (
  <>
    <p>A sunburst is an interactive data visualization in which hierarchical data is represented in concentric rings.
    Each ring segment is proportionally sized relative to the other segments at a given level.</p><p>The selection feature allows a user to focus on a specific node by clicking on it.</p>

    <ul>
      <li>
        By default, the
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        attribute is set to
        {" "}
        <i>'single'</i>
        . This allows selection of one node at a time.
      </li>
      <li>
        When
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        is set to
        {" "}
        <i>'multiple'</i>
        , selection of more than one node at a time is enabled. On desktop, select multiple nodes by
        holding the Ctrl key.
      </li>
      <li>
        Disable selection by setting
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        to
        {" "}
        <i>'none'</i>
        .
      </li>
    </ul>
  </>
);
