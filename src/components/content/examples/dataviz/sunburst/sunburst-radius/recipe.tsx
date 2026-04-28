// @ts-nocheck
import { h } from 'preact';

export const sunburstRadiusRecipe = (
  <>
    <ol>
      <li>
        For each node, set the radius using the
        <b>radius</b>
        attribute. The radius value is not absolute, but the relative size compared to the other nodes.
        If not specified, the default radius is 1.
      </li>
      <li>
        The radius of the sunburst hole is a fixed value smaller than 1. Scale the node radii
        accordingly to get the desired hole radius.
      </li>
    </ol>
  </>
);
