import 'preact';

const descriptionHtmlText = String.raw`<p>Toast messages are short, noncritical, auto-dismissible messages that communicate non-disruptive contextual messages.</p><p>
  This demo features
  <code class="prettyprint">oj-c-message-toast</code>
  that renders toast message in a page. Toast messages are suitable to display messages arriving
  asynchronously to the application or to communicate alerts to users.
</p>
<p>'F6' key can be used to navigate between the button and toast messages. Make sure to focus on the button first before using F6 to see the toggling.</p>`;

export const messagetoastBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
