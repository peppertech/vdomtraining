// @ts-nocheck
import { h } from 'preact';

export const messagebannerPageMessagesRecipe = (
  <>
    <p>Inline messages in page layout:</p>
    <ol>
      <li>
        Include a page header and add an
        {" "}
        <code className={"prettyprint"}>oj-message-banner</code>
        {" "}
        element below it
      </li>
      <li>
        Make the messages page level by setting the attribute
        {" "}
        <code className={"prettyprint"}>type</code>
        {" "}
        as
        {" "}
        <code className={"prettyprint"}>page</code>
      </li>
    </ol>

    <p>Specifying message properties:</p>
    <ul>
      <li>Set the 'closeAffordance' property to 'off' to not show the close icon in the message</li>
      <li>Set the 'timestamp' property to the time of the event the message is about</li>
      <li>
        Set the 'summary' property to the text that needs to be shown in the message summary area.
      </li>
      <li>
        Set the 'detail' property to the text that needs to be shown in the message detail area. This
        property can be ignored if needed to show the message with no detail text.
      </li>
      <li>
        Set the 'severity' property to one the supported values ('error', 'warning', 'confirmation',
        'info', 'none'). By default, this is set to 'error'. The icon in the header is decided based on
        the 'severity'. Set the 'severity' to 'none' if no icon should be shown.
      </li>
      <li>Set the 'sound' attribute to 'default' to play a sound when the message is displayed.</li>
    </ul>

    <p>Closing the messages:</p>
    <p>
      Bind a listener to listen to the
      {" "}
      <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#event:close"}>ojClose</a>
      {" "}
      event using the
      {" "}
      <code className={"prettyprint"}>on-oj-close</code>
      {" "}
      attribute. This listener will be called when one tries to close a message. Using the
      {" "}
      <code className={"prettyprint"}>event.detail.key</code>
      {" "}
      property, remove the corresponding entry from the
      {" "}
      <code className={"prettyprint"}>MutableArrayDataProvider</code>
      . This would in turn close the corresponding message in the UI. If the listener fails to remove
      the corresponding data from the
      {" "}
      <code className={"prettyprint"}>MutableArrayDataProvider</code>
      , no action will be performed by the component and the message will stay open in the UI
    </p>
  </>
);
