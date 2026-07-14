import 'preact';

const descriptionHtmlText = String.raw`<p>Truncating Text shows a tooltip containing the full text while also acting as a tab stop when truncation occurs.</p><p>
  This demo shows how overflow wrap can be used to control how truncating text behaves when words
  run out of space and move to the next line.
</p>`;

export const truncatingTextOverflowWrapcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
