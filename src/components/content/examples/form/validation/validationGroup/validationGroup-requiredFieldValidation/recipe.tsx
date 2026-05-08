import { h } from 'preact';

export const validationGroupRequiredFieldValidationRecipe = (
  <>
    <ul>
      <li>
        Put an
        {' '}<code className={"prettyprint"}>oj-validation-group</code>{' '}
        element around all your JET EditableValue components to track their valid state.
      </li>
      <li>
        Write a listener for the Submit button. The logic is if
        {' '}<code className={"prettyprint"}>oj-validation-group's</code>{' '}
        <code className={"prettyprint"}>valid</code>{' '}
        property isn't
        {' '}<code className={"prettyprint"}>valid</code>{' '}
        call
        {' '}<code className={"prettyprint"}>oj-validation-group's</code>{' '}
        <code className={"prettyprint"}>showMessages()</code>{' '}
        to show the required validation errors to the user and
        {' '}<code className={"prettyprint"}>focusOn('@firstInvalidShown')</code>{' '}
        to set focus on the first invalid field.
      </li>
      <li>
        For more information on required validation, see the form component's
        {' '}<a href={"#"}>required</a>{' '}
        attribute api.
      </li>
    </ul>
  </>
);
