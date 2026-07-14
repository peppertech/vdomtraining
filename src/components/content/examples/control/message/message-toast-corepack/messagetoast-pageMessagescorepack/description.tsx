import 'preact';

const descriptionHtmlText = String.raw`<p>Toast messages are short, noncritical, auto-dismissible messages that communicate non-disruptive contextual messages.</p><p>
  This demo features
  <code class="prettyprint">oj-c-message-toast</code>
  rendered in a page layout.
</p>
<p>
  Messages can be added or removed, and different message properties can be set from the settings
  panel in the page content area.
</p>`;

export const messagetoastPageMessagescorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
