import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A legend displays an interactive description of symbols, colors, etc., used in graphical information representations.</p><p>
  This demo shows legend item icons being customized. This demo uses shaped data. See the <a href="#" onclick="demoGoLink(event, 'legendCorepack', 'shapedData'); return false;">shaped data demo</a> for more details. Possible values for the
  <i><b>symbolType</b></i>
  property are:
  <i>line, marker, lineWithMarker, image</i>
  .
</p>`;

export const legendItemscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
