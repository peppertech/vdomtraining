import 'preact';

export const validationUsecasesAsyncValidatorsDescription = (
  <>
    <p>
      This demo shows the behavior of editable form controls created with the
      {' '}<code className={"prettyprint"}>validators</code>{' '}
      attribute containing both a synchronous and an asynchronous validator.
    </p>
    <p>
      When both validators finish, the valid state and value, if there is no error, are updated. The
      editable form control shows its errors as soon as it gets them, so the async validator message
      will be delayed if the validator&apos;s validate is delayed.
    </p>
    <p>
      The async validator&apos;s
      {' '}<code className={"prettyprint"}>validate</code>{' '}
      method returns a Promise that resolves if validation passes and value is updated or rejects
      with an Error if validation does not pass and value is not updated. The async validator also
      has a
      {' '}<code className={"prettyprint"}>hint</code>{' '}
      field that returns a Promise. Hints are displayed to the user when the user focuses the field.
    </p>
    <p>Set focus on the field to see the hint, which explains what to type to see the error.</p>
  </>
);
