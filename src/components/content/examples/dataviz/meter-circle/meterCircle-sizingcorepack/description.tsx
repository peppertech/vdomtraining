import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Meter circle displays information graphically in a circular bar, highlighting a specific metric value's progress in relation to its min, max, or thresholds.</p><p>This demo shows the JET Meter circle sizes.</p>`;

export const meterCircleSizingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
