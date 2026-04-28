// @ts-nocheck
import { h } from 'preact';

export const thematicMapRendererDescription = (
  <>
    <p>A thematic map is an interactive data visualization that displays data corresponding to geographic locations or regions.
                 Applications are required to supply a mapProvider for a valid thematic map.</p><p>
      This demo shows how to render custom SVG content for Thematic Map markers using custom renderer
      functions. Separate functions are used for rendering the base marker contents and for creating
      custom selection and hover effects. The hover and select renderers are called when the
      corresponding states have changed and they simply modify the existing DOM content to add and
      remove hover/selection effects as needed. For higher fidelity in border shapes, provide the
      component with higher fidelity basemap data.
    </p>
  </>
);
