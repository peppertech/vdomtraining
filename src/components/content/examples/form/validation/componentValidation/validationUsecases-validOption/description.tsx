import { h } from 'preact';

export const validationUsecasesValidOptionDescription = (
  <>
    <p>
      This demonstrates the JET form components
      <code className={"prettyprint"}>valid</code>
      property and the
      <code className={"prettyprint"}>on-valid-changed</code>
      property.
    </p>

    <ul>
      <li>"valid" means the form component is in a valid state.</li>
      <li>
        "pending" means the component is waiting for the validation state to be determined like if the
        validation is async.
      </li>
      <li>
        "invalidHidden" means the form component is invalid but the error is hidden and none are shown.
      </li>
      <li>"invalidShown" means the form component is invalid and errors are shown.</li>
    </ul>

    <p>New values may be added to the list of valid values in future releases.</p>

    <p>
      NOTE: You can instead use
      <code className={"prettyprint"}>oj-validation-group</code>
      to group the form components so you can get the
      <code className={"prettyprint"}>valid</code>
      property and call
      <code className={"prettyprint"}>showMessages()</code>
      on the group instead of on each component.
    </p>
  </>
);
