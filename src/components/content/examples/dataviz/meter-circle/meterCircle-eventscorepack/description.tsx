import 'preact';

const descriptionHtmlText = String.raw`<p>A Meter circle displays information graphically in a circular bar, highlighting a specific metric value's progress in relation to its min, max, or thresholds.</p><p>This demo shows how to use on-value-changed and transient-value to track the various Meter circle user interactions.</p>`;

export const meterCircleEventscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
