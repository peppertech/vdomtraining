import 'preact';

export const validatorsCustomValidatorsDescription = (
  <>
    <p>
      This demo shows how page authors can easily write a custom validator and use it on Oracle JET
      components using the{' '}
      <code className={"prettyprint"}>validators</code>{' '}
      option.
    </p>

    <ul>
      <li>The Password field is required and uses a regExp validator.</li>
      <li>
        The Confirm Password field is configured with a custom validator, 'equalToPassword', that is set
        using the{' '}
        <code className={"prettyprint"}>validators</code>{' '}
        option. The validator ensures that the value entered in this field matches the valid value
        entered in the 'Password' field.
      </li>
      <li>
        The password observable uses a ko subscriber to ensure that when its value changes, the Confirm
        Password field is re-validated if it holds a non-empty value.
      </li>
    </ul>

    <h2>Test Steps</h2>

    <ol>
      <li>
        In the Password field, enter a valid password (for example, Hello1) and tab off the field.
      </li>
      <li>
        In the Confirm Password field, enter a value that does not match the password (for example,
        Hello2) and tab off the field. Notice the element shows a validation error thrown by the custom
        validator.
      </li>
      <li>
        In the Confirm Password field, now enter the same value as in Password field (for example,
        Hello1) and tab off the field. Notice that this value is accepted and the error cleared.
      </li>
      <li>
        In the Password field, change the value to a different valid value (for example, Foobar1), and
        tab off the field. Notice that the Confirm Password field automatically shows an error.
      </li>
      <li>
        In the Confirm Password field, enter a value that matches the one entered in the Password field
        (for example, Foobar1), and tab off the field. Notice that the error in the Confirm Password
        field is cleared.
      </li>
    </ol>
  </>
);
