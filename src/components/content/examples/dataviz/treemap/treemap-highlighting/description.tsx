// @ts-nocheck
import { h } from 'preact';

export const treemapHighlightingDescription = (
  <>
    <p>
      A tree map is an interactive data visualization in which hierarchical data is represented across
      two dimensions by the size and color of nested rectangular nodes.
    </p>
    <p>This demo shows the JET Treemap highlighting feature.</p>
    <p>
      By default, highlighting on hover is disabled - the <i><b>hover-behavior</b></i> attribute is
      set to <i>'none'</i>.
    </p>
    <p>
      When <i><b>hover-behavior</b></i> is set to <i>'dim'</i>, all objects that belong to the same
      category as the hovered item are highlighted if the <i><b>highlight-mode</b></i> attribute is
      set to <i>'categories'</i>, and all objects that are descendants of the hovered item are
      highlighted if the <i><b>highlight-mode</b></i> attribute is set to <i>'descendants'</i>.
    </p>
  </>
);
