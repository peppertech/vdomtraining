import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Meter circle displays information graphically in a circular bar, highlighting a specific metric value's progress in relation to its min, max, or thresholds.</p><p>This demo shows the JET Meter circle with various customizations.</p>
<ul>
  <li>Meter circle supports changing the size of the indicator.</li>
  <li>Meter circle supports changing the inner radius of the indicator</li>
  <li>Meter circle supports changing the color of the indicator</li>
</ul>`;

export const meterCircleCustomizationcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
