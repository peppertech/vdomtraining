import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Meter circle displays information graphically in a circular bar, highlighting a specific metric value's progress in relation to its min, max, or thresholds.</p><p>
  This demo shows how to use the
   <b>centerTemplate</b>
  slot to create custom content within the center of a meter circle.
</p>`;

export const meterCircleCenterContentcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
