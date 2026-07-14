import 'preact';

const descriptionHtmlText = String.raw`<p>A Meter bar displays information graphically in a rectangular bar, highlighting a specific metric value's progress in relation to its min, max, or thresholds.</p><p>This demo shows how to use on-value-changed and transient-value to track the various Meter bar user interactions.</p>`;

export const meterBarEventscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
