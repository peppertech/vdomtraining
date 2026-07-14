import 'preact';

const descriptionHtmlText = String.raw`<p>A collapsible displays a header that can be expanded to show its content.</p>This demo shows what collapsibles looks like with different icon positions ( start, end).`;

export const collapsibleIconPositioncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
