// @ts-nocheck
import { h } from 'preact';

export const messagebannerSectionMessagesRecipe = (
  <>
    <ul>
      <li>
        Create two sections on the page (one for personal information and another one for employment
        information) and add an
        <code className={"prettyprint"}>oj-message-banner</code>
        element for each of the sections
      </li>
      <li>
        Create two
        <code className={"prettyprint"}>MutableArrayDataProvider</code>
        s, each consisting of an Array of messages data and bind it to the
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#data"}>data</a>
        attribute of the corresponding
        <code className={"prettyprint"}>oj-message-banner</code>
        element
      </li>
      <li>
        Use the
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#type"}>type</a>
        attribute to specify the type of Message Banner to be
        <code className={"prettyprint"}>section</code>
      </li>
      <li>
        Finally, bind a listener to listen to the
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#event:close"}>ojClose</a>
        event using the
        <code className={"prettyprint"}>on-oj-close</code>
        attribute. This listener will be called when one tries to close a message. Using the
        <code className={"prettyprint"}>event.detail.key</code>
        property, remove the corresponding entry from the
        <code className={"prettyprint"}>MutableArrayDataProvider</code>
        . This would in turn close the corresponding message in the UI. If the listener fails to remove
        the corresponding data from the
        <code className={"prettyprint"}>MutableArrayDataProvider</code>
        , no action will be performed by the component and the message will stay open in the UI
      </li>
      <li>
        See
        <a href={"#"}>Page Messages</a>
        demo for various attributes that can be used for customizing the content of the messages.
      </li>
    </ul>
  </>
);
