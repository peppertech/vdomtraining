import 'preact';

const descriptionHtmlText = String.raw`<p>Truncating Text shows a tooltip containing the full text while also acting as a tab stop when truncation occurs.</p><p>
  This demo shows how hyphens can be used when truncating text has long words that span multiple
  lines.
</p>`;

export const truncatingTextHyphenscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
