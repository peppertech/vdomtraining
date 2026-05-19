// @ts-nocheck
import { h } from 'preact';

export const messagebannerTestRecipe = (
  <>
    <ul>
      <li>
        Create an
        <code className={"prettyprint"}>oj-message-banner</code>
        element
      </li>
      <li>
        Create an
        <code className={"prettyprint"}>ArrayDataProvider</code>
        consisting of an Array of messages data and bind it to the
        <a target={"_blank"} href={"jsdocs/oj.ojBanner.html#data"}>data</a>
        attribute of the
        <code className={"prettyprint"}>oj-banner</code>
        element
      </li>
      <li>
        Use to the
        <a target={"_blank"} href={"jsdocs/oj.ojBanner.html#type"}>type</a>
        attribute to specify the type of Banner Messages. They can be either
        <code className={"prettyprint"}>edgeToEdge</code>
        or
        <code className={"prettyprint"}>outlined</code>
        . Banner Messages are
        <code className={"prettyprint"}>edgeToEdge</code>
        by default
      </li>
      <li>
        Finally, bind a listener to listen to the
        <a target={"_blank"} href={"jsdocs/oj.ojBanner.html#event:close"}>ojClose</a>
        event using the
        <code className={"prettyprint"}>on-oj-close</code>
        attribute. This listener will be called when one tries to close a message. Using the
        <code className={"prettyprint"}>event.metadata.key</code>
        property, remove the corresponding entry from the
        <code className={"prettyprint"}>ArrayDataProvider</code>
        . This would in-turn close the corresponding message in the UI. If the listener fails to remove
        the corresponding data from the
        <code className={"prettyprint"}>ArrayDataProvider</code>
        , no action will be performed by the component and the message will stay open in the UI
      </li>
      <li>
        Additionally, to add new messages, simple add the new message data object to the existing
        <code className={"prettyprint"}>ArrayDataProvider</code>
        and the new messages will be opened in the UI at the position defined by the index at which the
        new data is inserted. One could also add/remove messages in bulk, by updating the underlying
        data directly. Which messages are added, removed and updated are determined by the keyAttribute
      </li>
    </ul>
  </>
);
