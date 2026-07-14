import 'preact';

const descriptionHtmlText = String.raw`<p>A collapsible displays a header that can be expanded to show its content.</p>This demo shows what collapsibles look like with different header levels (h1, h2, h3, h4, h5, h6).`;

export const collapsibleHeaderLevelscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
