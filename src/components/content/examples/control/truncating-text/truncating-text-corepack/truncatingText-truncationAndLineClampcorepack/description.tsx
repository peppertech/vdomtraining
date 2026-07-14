import 'preact';

const descriptionHtmlText = String.raw`<p>Truncating Text shows a tooltip containing the full text while also acting as a tab stop when truncation occurs.</p><p>
  This demo shows how the truncation and line-clamp attributes can be used to control the behavior
  of text when spacing affects how it is displayed.
</p>`;

export const truncatingTextTruncationAndLineClampcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
