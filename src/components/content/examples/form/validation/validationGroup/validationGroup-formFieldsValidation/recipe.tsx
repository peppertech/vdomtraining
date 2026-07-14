import 'preact';

export const validationGroupFormFieldsValidationRecipe = (
  <>
    <ul>
      <li>
        Put an
        {' '}<code className={"prettyprint"}>oj-validation-group</code>{' '}
        element around all your JET EditableValue components to track their valid state.
      </li>
      <li>
        Write a listener for the Submit button. It stops submission if
        {' '}<code className={"prettyprint"}>oj-validation-group's</code>{' '}
        {' '}<code className={"prettyprint"}>valid</code>{' '}
        property isn't
        {' '}<code className={"prettyprint"}>valid</code>{' '}
        and it calls
        {' '}<code className={"prettyprint"}>oj-validation-group's</code>{' '}
        {' '}<code className={"prettyprint"}>showMessages()</code>{' '}
        and
        {' '}<code className={"prettyprint"}>focusOn()</code>.
      </li>
      <li>
        Write
        {' '}<code className={"prettyprint"}>on-value-changed</code>{' '}
        listener for first email field to clear the second email field.
      </li>
      <li>
        Write
        {' '}<code className={"prettyprint"}>on-value-changed</code>{' '}
        listener for second email field to do a cross-field validation with first email field
        to make sure they match.
      </li>
    </ul>
  </>
);
