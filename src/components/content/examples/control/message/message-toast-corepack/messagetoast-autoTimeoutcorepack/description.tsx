import { h } from "preact";

const descriptionHtmlText = String.raw`<p>Toast messages are short, noncritical, auto-dismissible messages that communicate non-disruptive contextual messages.</p><p>
  This demo features 'autoTimeout' property of
  <code class="prettyprint">MessageToastItem</code>
  object.
</p>
<p>
  This property can be used to specify the number of seconds a message will be shown before it
  is closed automatically.
</p>
<p>
  Special value of 'off' means auto dismiss is disabled. Another special value 'on' means a theme
  based value will be applied.
</p>
<p>
  In this demo, the default value 'off' is used when page is initially rendered. Use the select
  field in the page to select one of pre-defined timeout values for the new message, and press
  the 'Open new toast' button.
</p>
<p>
  Low vision users are likely to interact with zoomed sections of the page, but messages could be
  shown outside of such sections and therefore go unnoticed. Such users will need more time to read
  messages. Therefore, autoTimeout and sound options can be provided as user settings/preferences
  to improve accessibility. Implementing a message history, and providing options
  to show earlier closed messages will also improve accessibility.
</p>`;

export const messagetoastAutoTimeoutcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
