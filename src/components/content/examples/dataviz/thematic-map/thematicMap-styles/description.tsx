// @ts-nocheck
import { h } from 'preact';

export const thematicMapStylesDescription = (
  <>
    <p>A thematic map is an interactive data visualization that displays data corresponding to geographic locations or regions.
                 Applications are required to supply a mapProvider for a valid thematic map.</p><p>
      Non data associated map areas and data items can be styled globally via css, per element using the
      {" "}
      <code>style-defaults</code>
      {" "}
      attribute, or if data dependent, individually within the data item. This demo shows how to style
      areas and markers at the element level. For higher fidelity in border shapes, provide the
      component with higher fidelity basemap data.
    </p>
  </>
);
