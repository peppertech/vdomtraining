import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A popup temporarily 'pops up' content in the foreground.</p><p>Demonstrates how the popup looks with a simple tail in the most common positions.</p>`;

export const popupTailCommonPositionscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
