import { h } from 'preact';

export const validationGroupOneRequiredValidationRecipe = (
  <>
    <ul>
      <li>
        Put an
        <code className={"prettyprint"}>oj-validation-group</code>
        element around all your JET EditableValue components to track their valid state.
      </li>
      <li>
        Write a listener to validate the three fields' observables are not all empty. Bind the same
        listener to all three fields using the{' '}
        <code className={"prettyprint"}>on-value-changed</code>
        attribute. It validates to make sure at least one field is filled in. If validate
        fails, it sets the first field&apos;s
        <code className={"prettyprint"}>messagesCustom</code>
        property with the error so the user sees the error inline.
      </li>
      <li>
        Write a similar listener for the Submit button that also uses oj-validation-group. If
        <code className={"prettyprint"}>oj-validation-group</code>
        {' '}s
        <code className={"prettyprint"}>valid</code>
        property isn't
        <code className={"prettyprint"}>valid</code>
        it calls
        <code className={"prettyprint"}>oj-validation-group</code>
        {' '}s
        <code className={"prettyprint"}>showMessages()</code>
        and
        <code className={"prettyprint"}>focusOn('@firstInvalidShown')</code>.
      </li>
    </ul>
  </>
);
