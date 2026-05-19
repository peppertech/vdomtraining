import { h } from "preact";

const descriptionHtmlText = String.raw`<p>Message Banners are brief, moderately disruptive, semi-permanent messages that help communicate relevant and useful information.</p>This demo shows how to configure the
<strong>&lt;oj-c-message-banner&gt;</strong>
component to group multiple messages into a single detailed list using the
<code>detail-template-value</code>
attribute.`;

export const messagebannerDetailListcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
