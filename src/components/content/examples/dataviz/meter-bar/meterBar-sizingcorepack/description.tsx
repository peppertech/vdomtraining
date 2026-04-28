import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Meter bar displays information graphically in a rectangular bar, highlighting a specific metric value's progress in relation to its min, max, or thresholds.</p><p>This demo shows the JET Meter bar sizes.</p>`;

export const meterBarSizingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
