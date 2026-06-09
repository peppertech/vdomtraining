// @ts-nocheck
import { h } from 'preact';

export const thematicMapMarkerSizingDescription = (
  <>
    <p>A thematic map is an interactive data visualization that displays data corresponding to geographic locations or regions.
                 Applications are required to supply a mapProvider for a valid thematic map.</p><p>
      If your markers should be proportionally sized based on a data value, instead of setting the
      marker
      {" "}
      <code>width</code>
      {" "}
      and
      {" "}
      <code>height</code>
      {" "}
      properties, you can pass the data value directly to the marker
      {" "}
      <code>value</code>
      {" "}
      property. The marker dimensions will be calculated based on the range of all the data values and
      the element size. Markers with negative or zero data values will not be rendered.
    </p>
  </>
);
