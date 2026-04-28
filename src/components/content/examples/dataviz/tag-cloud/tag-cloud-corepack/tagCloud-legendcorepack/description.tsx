import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tag cloud is an interactive data visualization of textual data, where the importance of each tagged word or phrase is represented by font size or color.</p><p>
  Tag clouds do not render with an accompanying Legend, but can be configured to
  correspond with an oj-c-legend element.
</p>
<p>This demo shows the following features all in one demo:</p>
<ul>
  <li>Settting up a standalone Legend with your Tag cloud.</li>
  <li>Using the <a target="_blank" href="jsdocs/oj.ColorAttributeGroupHandler.html">ColorAttributeGroupHandler</a> to set up colors for your data.</li>
  <li>Using <i><b>categories</b></i> and the <i><b>hidden-categories</b></i> APIs to set up hide show behaviour between your Legend and Tag cloud.</li>
  <li>Setting up meaningful short descriptions and data tips for your Tag Cloud items.</li>
</ul>`;

export const tagCloudLegendcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
