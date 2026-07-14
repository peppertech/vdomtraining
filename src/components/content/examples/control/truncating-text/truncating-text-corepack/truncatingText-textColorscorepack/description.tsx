import 'preact';

const descriptionHtmlText = String.raw`<p>Truncating Text shows a tooltip containing the full text while also acting as a tab stop when truncation occurs.</p><p>This demo shows variants that are available to change the color of truncating text.</p>`;

export const truncatingTextTextColorscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
