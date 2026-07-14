// @ts-nocheck
import 'preact';

export const messagebannerKeyboardNavigationRecipe = (
  <>
    <ul>
      <li>
        Create three
        {" "}
        <code className={"prettyprint"}>oj-message-banner</code>
        {" "}
        elements
      </li>
      <li>
        Create three
        {" "}
        <code className={"prettyprint"}>MutableArrayDataProvider</code>
        {" "}
        consisting of an Array of messages data, one for each
        {" "}
        <code className={"prettyprint"}>oj-message-banner</code>
        {" "}
        component and bind it to the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#data"}>data</a>
        {" "}
        attribute of each of the
        {" "}
        <code className={"prettyprint"}>oj-message-banner</code>
        {" "}
        elements
      </li>
      <li>
        Use to the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#type"}>type</a>
        {" "}
        attribute to specify the type of Message Banner. They can be either
        {" "}
        <code className={"prettyprint"}>page</code>
        {" "}
        or
        {" "}
        <code className={"prettyprint"}>section</code>
        . Message Banner are
        {" "}
        <code className={"prettyprint"}>section</code>
        {" "}
        by default. Set the top-most component to
        {" "}
        <code className={"prettyprint"}>page</code>
        {" "}
        and rest of the components to
        {" "}
        <code className={"prettyprint"}>section</code>
      </li>
      <li>
        Finally, bind listeners to listen to the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojMessageBanner.html#event:close"}>ojClose</a>
        {" "}
        event using the
        {" "}
        <code className={"prettyprint"}>on-oj-close</code>
        {" "}
        attribute for each of the components. This listener will be called when one tries to close a
        message. Using the
        {" "}
        <code className={"prettyprint"}>event.detail.key</code>
        {" "}
        property, remove the corresponding entry from the corresponding
        {" "}
        <code className={"prettyprint"}>MutableArrayDataProvider</code>
        . This would in-turn close the corresponding message in the UI. If the listener fails to remove
        the corresponding data from the
        {" "}
        <code className={"prettyprint"}>MutableArrayDataProvider</code>
        , no action will be performed by the component and the message will stay open in the UI
      </li>
      <li>
        See
        {" "}
        <a href={"#"}>Page Messages</a>
        {" "}
        demo for various attributes that can be used for customizing the content of the messages.
      </li>
    </ul>
  </>
);
