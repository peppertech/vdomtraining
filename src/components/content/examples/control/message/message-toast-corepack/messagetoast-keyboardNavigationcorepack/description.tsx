import { h } from "preact";

const descriptionHtmlText = String.raw`<p>Toast messages are short, noncritical, auto-dismissible messages that communicate non-disruptive contextual messages.</p><p>
  This demo shows how to navigate through the messages in the
  <code class="prettyprint">oj-c-message-toast</code>
  component using the keyboard.
</p>
<p>
  The demo initially renders with a single toast message. Press the <b>Update</b> button to open a new toast.
</p>
<p>The messages can be navigated using the keyboard as follows:</p>
<ol>
  <li>
    <code class="prettyprint">F6</code>
    - Cycles the focus between the most recent toast message and the prior focused element.
  </li>
  <li>
    <code class="prettyprint">Esc</code>
    - If pressed when a message is focused, it closes the corresponding message and moves the focus
    back to the previously focused element in the page. If the message is not closable, it will
    return focus to the previously focused element without closing the message.
  </li>
  <li>
    <code class="prettyprint">Tab</code>
    - Moves the focus through the tabbable elements in the messages.
  </li>
  <li>
    <code class="prettyprint">Shift + Tab</code>
    - Moves the focus through the tabbable elements in the messages in reverse.
  </li>
  <li>
    <code class="prettyprint">Enter/Space</code>
    - Activates the currently focused element in the message.
  </li>
</ol>`;

export const messagetoastKeyboardNavigationcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
