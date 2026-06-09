// @ts-nocheck
import { h } from 'preact';

export const messagesInlineRecipe = (
  <>
    <p>Inline messages:</p>
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
        Make the messages inline by not specifying 'position' attribute for
        {" "}
        <code className={"prettyprint"}>&lt;oj-messages&gt;</code>
        .
      </li>
    </ol>
  </>
);
