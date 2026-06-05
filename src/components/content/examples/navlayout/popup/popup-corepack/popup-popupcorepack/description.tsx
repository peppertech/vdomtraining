import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A popup temporarily 'pops up' content in the foreground.</p><p>Demonstrates the popup's default properties. Click the "Go" button to open the popup.</p>`;

export const popupPopupcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
