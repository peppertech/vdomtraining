import { h } from "preact";

export const messagetoastAutoTimeoutRecipe = (
  <>
    <p>Auto timeout messages:</p>
    <ol>
      <li>
        Include an <code className="prettyprint">&lt;oj-messages&gt;</code> element in the page.
      </li>
      <li>
        Set <code className="prettyprint">display</code> to <code className="prettyprint">notification</code>.
      </li>
      <li>
        Provide message data with the <code className="prettyprint">autoTimeout</code> value set for each
        message.
      </li>
      <li>
        Update the messages DataProvider when users change the timeout settings.
      </li>
    </ol>
  </>
);
