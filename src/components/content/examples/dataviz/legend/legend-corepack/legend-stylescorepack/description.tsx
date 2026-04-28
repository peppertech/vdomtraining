import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A legend displays an interactive description of symbols, colors, etc., used in graphical information representations.</p><p>This demo shows the various customizations that JET Core Pack Legend supports.</p>
<ul>
  <li>Legend supports customizing text.</li>
  <li>Legend supports customizing symbol.</li>
</ul>`;

export const legendStylescorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
