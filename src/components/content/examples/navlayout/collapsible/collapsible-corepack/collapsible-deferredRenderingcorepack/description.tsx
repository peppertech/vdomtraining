import 'preact';

const descriptionHtmlText = String.raw`<p>A collapsible displays a header that can be expanded to show its content.</p>This demo showcases a collapsible that defers rendering content.`;

export const collapsibleDeferredRenderingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
