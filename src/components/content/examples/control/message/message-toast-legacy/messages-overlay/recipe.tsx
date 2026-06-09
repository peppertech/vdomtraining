// @ts-nocheck
import { h } from 'preact';

export const messagesOverlayRecipe = (
  <>
    <p>Overlay messages:</p>
    <ol>
      <li>
        Include a
        {" "}
        <code className={"prettyprint"}>&lt;oj-messages&gt;</code>
        {" "}
        element in the page and set its 'messages' property to a DataProvider. This demo uses an
        ArrayDataProvider wrapping a simple array of messages data.
      </li>
      <li>
        Set the 'severity', 'summary' and 'detail' attributes for each message data in the collection.
      </li>
      <li>
        Set the 'position' attribute of
        {" "}
        <code className={"prettyprint"}>&lt;oj-messages&gt;</code>
        {" "}
        to empty object to get default position, or set it to a fully defined position object
      </li>
      <li>
        Set the 'display' attribute of
        {" "}
        <code className={"prettyprint"}>&lt;oj-messages&gt;</code>
        {" "}
        to 'general'
      </li>
    </ol>
  </>
);
