import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A legend displays an interactive description of symbols, colors, etc., used in graphical information representations.</p><p>
  Legends can display multiple sections of marker-label pairs, and they support custom title headers for individual sections.
</p>
<p>This demo shows the JET Core Pack Legend supports for sections</p>
  <ul>
    <li>Legend supports grouping items into sections.</li>
    <li>Consider using attribute groups handlers to efficiently set style properties on corresponding items when using the legend with other visualizations.</li>
  </ul>`;

export const legendSectionscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
