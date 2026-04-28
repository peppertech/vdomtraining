import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    This demo configures item properties directly in the data object to more easily show a variety
    of different configurations. These properties can also be configured using attributes on the
    oj-c-legend-item element.
  </li>
  <li>
    To create a line icon, set
    <i><b>symbolType</b></i>
    to
    <i>line</i>
    or
    <i>lineWithMarker</i>
    . The line can be customized using
    <i><b>lineWidth</b></i>
    and
    <i><b>lineStyle</b></i>
    .
  </li>
  <li>
    To create a marker icon, set
    <i><b>symbolType</b></i>
    to
    <i>marker</i>
    or
    <i>lineWithMarker</i>
    . The marker can be customized using
    <i><b>markerShape</b></i>
    . Additionally,
    <i><b>markerColor</b></i>
    can be specified to control the marker color if it's different from the line color for
    <i>lineWithMarker</i>
    type.
  </li>
  <li>
    To create an image icon, set
    <i><b>symbolType</b></i>
    to
    <i>image</i>
    and
    <i><b>source</b></i>
    to the image path.
  </li>
  <li>
    The dimensions of the legend icons can be set using the oj-c-legend
    <i><b>symbol-width</b></i>
    and
    <i><b>symbol-height</b></i>
    attributes.
  </li>
</ol>`;

export const legendItemscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
