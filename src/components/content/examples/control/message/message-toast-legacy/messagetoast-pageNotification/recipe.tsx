import 'preact';

export const messagetoastPageNotificationRecipe = (
  <>
    <p>Toast notification messages:</p>
    <ol>
      <li>
        Include an <code className="prettyprint">&lt;oj-messages&gt;</code> element in the page.
      </li>
      <li>
        Set <code className="prettyprint">display</code> to <code className="prettyprint">notification</code>.
      </li>
      <li>
        Bind <code className="prettyprint">messages</code> to a DataProvider containing message data.
      </li>
      <li>
        Use the <code className="prettyprint">position</code> property to place toast notifications
        relative to the page header or demo container.
      </li>
      <li>
        Use a message template when the message needs custom styling or custom close handling.
      </li>
    </ol>
  </>
);
