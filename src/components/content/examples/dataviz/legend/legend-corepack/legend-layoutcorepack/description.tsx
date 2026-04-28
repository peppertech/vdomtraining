import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A legend displays an interactive description of symbols, colors, etc., used in graphical information representations.</p><p>This demo shows the layout properties of the legend can be set to customize the items placement.</p>
<ul>
  <li>Legend supports changing the orientation</li>
  <li>Legend supports changing the horizontal alignment</li>
  <li>Legend supports changing the vertical alignment</li>
  <li>Alternatively, the <a target="_blank" href="jsdocs/legend-utils.html#getPreferredSize"><b>getPreferredSize</b></a> util for the legend element can be used to find the optimal size for the legend based on its contents in a given available space. This is useful for knowing how much space to allocate when rendering the legend either within or alongside other components.</li>
</ul>`;

export const legendLayoutcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
