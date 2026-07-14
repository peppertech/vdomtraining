import 'preact';

const descriptionHtmlText = String.raw`<p>A collapsible displays a header that can be expanded to show its content.</p>This demo shows what collapsibles look like with a horizontal divider at different header levels (h1, h2, h3,
h4).`;

export const collapsibleBorderscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
