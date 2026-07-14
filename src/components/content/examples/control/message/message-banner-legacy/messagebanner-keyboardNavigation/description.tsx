// @ts-nocheck
import 'preact';

export const messagebannerKeyboardNavigationDescription = (
  <>
    <p>Message Banners are brief, moderately disruptive, semi-permanent messages that help communicate relevant and useful information.</p><p>
      This demo shows how to navigate through the messages in the
      {" "}
      <code className={"prettyprint"}>oj-message-banner</code>
      {" "}
      component using the keyboard.
    </p>
    <p>
      The demo shows a page-level message by default. It also has two section messages which will appear
      on pressing the
      {" "}
      <b>Update</b>
      {" "}
      button in the respective section.
    </p>
    <p>The messages can be navigated using the keyboard as follows:</p>
    <ol>
      <li>
        <code className={"prettyprint"}>F6</code>
        {" "}
        - Cycles the focus through all the messages sections on the page starting from the most recent
        one. Then finally, transfers the focus back to the prior focused element.
      </li>
      <li>
        <code className={"prettyprint"}>Esc</code>
        {" "}
        - If pressed when a message is focused, it closes the corresponding message and moves the focus
        back to the previously focused element in the page. If the message is not closable, it will
        return focus to the previously focused element without closing the message.
      </li>
      <li>
        <code className={"prettyprint"}>Tab</code>
        {" "}
        - Moves the focus through the tabbable elements in the messages.
      </li>
      <li>
        <code className={"prettyprint"}>Shift + Tab</code>
        {" "}
        - Moves the focus through the tabbable elements in the messages in reverse.
      </li>
      <li>
        <code className={"prettyprint"}>Enter/Space</code>
        {" "}
        - Activates the currently focused element in the message.
      </li>
    </ol>
  </>
);
