import 'preact';

const descriptionHtmlText = String.raw`<p>Toast messages are short, noncritical, auto-dismissible messages that communicate non-disruptive contextual messages.</p><p>This demo shows how to configure the
<strong>&lt;oj-c-message-toast&gt;</strong>
component to have progress circle for the start icon using the
<code>icon-template-value</code>
attribute.</p>

<p>To start the progress, click the <b>Start progress</b> button. And once the progress is completed, the
messages will turn into acknowledgement messages and get auto-dismissed after 5 seconds.</p>`;

export const messagetoastProgresscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
