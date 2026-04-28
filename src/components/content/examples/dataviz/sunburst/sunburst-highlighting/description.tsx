// @ts-nocheck
import { h } from 'preact';

export const sunburstHighlightingDescription = (
  <>
    <p>A sunburst is an interactive data visualization in which hierarchical data is represented in concentric rings.
    Each ring segment is proportionally sized relative to the other segments at a given level.</p><p>This demo shows the JET Sunburst highlighting feature.</p>
    <ul>
      <li>
        By default, highlighting on hover is disabled - the
        <i><b>hover-behavior</b></i>
        attribute is set to
        <i>'none'</i>
      </li>
      <li>
        When
        <i><b>hover-behavior</b></i>
        is set to
        <i>'dim'</i>
        , all objects that belong to the same category as hovered item are going to be highlighted if
        <i><b>highlight-mode</b></i>
        attribute is set to
        <i>'categories'</i>
        and all objects that are descendants of the hovered item are going to be highlighted if
        <i><b>highlight-mode</b></i>
        attribute is set to
        <i>'descendants</i>
        .
      </li>
    </ul>
  </>
);
