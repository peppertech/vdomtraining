import 'preact';

const descriptionHtmlText = String.raw`<p>Toast messages are short, noncritical, auto-dismissible messages that communicate non-disruptive contextual messages.</p>This demo shows how to configure the
<strong>&lt;oj-c-message-toast&gt;</strong>
component to have action items in the detail area using the
<code>detail-template-value</code>
attribute.`;

export const messagetoastDetailActionscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
