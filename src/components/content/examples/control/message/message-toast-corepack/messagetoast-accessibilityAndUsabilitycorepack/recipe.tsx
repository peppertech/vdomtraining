import { h } from "preact";

export const messagetoastAccessibilityAndUsabilitycorepackRecipe = (
  <>
    <p>Accessibility and usability settings:</p>
    <ol>
      <li>
        Include an <code className="prettyprint">&lt;oj-c-message-toast&gt;</code> element in the page.
      </li>
      <li>
        Bind the <code className="prettyprint">data</code> property to a MutableArrayDataProvider of
        message toast items.
      </li>
      <li>
        Use <code className="prettyprint">autoTimeout</code> to control how long each toast remains
        visible.
      </li>
      <li>
        Use <code className="prettyprint">sound</code> and <code className="prettyprint">position</code>
        {" "}
        to support user preferences.
      </li>
      <li>
        Keep earlier closed messages in history when users need more time to review them.
      </li>
    </ol>
  </>
);
