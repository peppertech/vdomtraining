import 'preact';

export const validationGroupAsyncValidationRecipe = (
  <>
    <ul>
      <li>
        Put an
        {' '}<code className={"prettyprint"}>oj-validation-group</code>{' '}
        element around all your JET EditableValue components to track their valid state.
      </li>
      <li>
        Since the form component's validator is asynchronous, the
        {' '}<code className={"prettyprint"}>oj-validation-group's</code>{' '}
        <code className={"prettyprint"}>valid</code>{' '}
        property value can be
        {' '}<code className={"prettyprint"}>pending</code>
        , and you will have to wait until it is no longer pending to submit.
      </li>
      <li>
        Use a flag variable and an
        {' '}<code className={"prettyprint"}>onValidChanged</code>{' '}
        listener to wait on
        {' '}<code className={"prettyprint"}>oj-validation-group's</code>{' '}
        <code className={"prettyprint"}>valid</code>{' '}
        property value to no longer be
        {' '}<code className={"prettyprint"}>pending</code>
        . Then, if
        {' '}<code className={"prettyprint"}>valid</code>
        , you can submit.
      </li>
      <li>
        Bind the Submit button's
        {' '}<code className={"prettyprint"}>disabled</code>{' '}
        property to be true when
        {' '}<code className={"prettyprint"}>oj-validation-group's</code>{' '}
        <code className={"prettyprint"}>valid</code>{' '}
        property is
        {' '}<code className={"prettyprint"}>pending</code>
        .
      </li>
      <li>
        The async validator is mocked-up using a setTimeout. Feel free to play with the timeout time in
        this demo.
      </li>
    </ul>
  </>
);
