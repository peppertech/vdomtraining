import 'preact';

export const messagetoastAccessibilityAndUsabilityRecipe = (
  <>
    <p>Accessibility and usability settings:</p>
    <ol>
      <li>
        Include an <code className="prettyprint">&lt;oj-messages&gt;</code> element in the page.
      </li>
      <li>
        Set <code className="prettyprint">display</code> to <code className="prettyprint">notification</code>.
      </li>
      <li>
        Configure <code className="prettyprint">autoTimeout</code> values to give users enough time
        to review messages.
      </li>
      <li>
        Provide sound and placement settings when users need those preferences.
      </li>
      <li>
        Keep earlier closed messages available so users can restore and review them.
      </li>
    </ol>
  </>
);
