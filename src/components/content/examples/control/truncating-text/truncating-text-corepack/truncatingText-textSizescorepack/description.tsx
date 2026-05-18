import { h } from "preact";

const descriptionHtmlText = String.raw`<p>Truncating Text shows a tooltip containing the full text while also acting as a tab stop when truncation occurs.</p><p>This demo shows sizes that are available for truncating text.</p>`;

export const truncatingTextTextSizescorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
