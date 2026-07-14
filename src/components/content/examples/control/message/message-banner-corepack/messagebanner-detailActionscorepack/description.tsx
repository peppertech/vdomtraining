import 'preact';

const descriptionHtmlText = String.raw`<p>Message Banners are brief, moderately disruptive, semi-permanent messages that help communicate relevant and useful information.</p>This demo shows how to configure the
<strong>&lt;oj-c-message-banner&gt;</strong>
component to have action items in the detail area using the
<code>detail-template-value</code>
attribute.`;

export const messagebannerDetailActionscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
