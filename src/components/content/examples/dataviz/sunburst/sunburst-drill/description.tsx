// @ts-nocheck
import { h } from 'preact';

export const sunburstDrillDescription = (
  <>
    <p>A sunburst is an interactive data visualization in which hierarchical data is represented in concentric rings.
    Each ring segment is proportionally sized relative to the other segments at a given level.</p><p>
      This demo shows drilling for the JET Sunburst when all the data is provided on the initial render.
      Click on a child node to drill in. For a dynamically loaded data demo, please see
      <a href={"#"}>Treemap Drill Demo</a>
      .
    </p>
    <p>
      If selection is turned on, drilling can be done by double clicking. The single click gesture will
      be reserved for selection.
    </p>
  </>
);
