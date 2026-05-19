import { h } from "preact";

const descriptionHtmlText = String.raw`<p>Message Banners are brief, moderately disruptive, semi-permanent messages that help communicate relevant and useful information.</p>This demo shows how to configure the
<strong>&lt;oj-c-message-banner&gt;</strong>
component to change the order of the messages rendered using the
<code>sorting</code>
attribute.`;

export const messagebannerSortingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
