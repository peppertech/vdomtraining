import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Meter bar displays information graphically in a rectangular bar, highlighting a specific metric value's progress in relation to its min, max, or thresholds.</p><p>This demo shows the JET Meter bar with various customizations.</p>
<ul>
  <li>Meter bar supports changing the size of the indicator.</li>
  <li>Meter bar supports changing the color of the indicator.</li>
</ul>`;

export const meterBarCustomizationcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
