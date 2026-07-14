import 'preact';

export const validationUsecasesValidOptionRecipe = (
  <>
    <ul>
      <li>Create a listener for when the Submit button is clicked</li>
      <li>
        In that listener, check each component's
        {' '}<code className={"prettyprint"}>valid</code>{' '}
        property and when both are valid then it is safe to submit the form.
      </li>
      <li>
        On each form field, set an
        {' '}<code className={"prettyprint"}>on-valid-changed</code>{' '}
        listener which will update the valid state observable we display under the field as the
        {' '}<code className={"prettyprint"}>valid</code>{' '}
        property changes.
      </li>
      <li>
        Initialize the
        {' '}<code className={"prettyprint"}>userNameValid</code>{' '}
        and
        {' '}<code className={"prettyprint"}>passwordValid</code>{' '}
        observables using the component's
        {' '}<code className={"prettyprint"}>valid</code>{' '}
        property. You need to wait for the BusyContext to resolve before checking the component's
        properties to ensure the component has been created and its binding resolved.
      </li>
    </ul>
  </>
);
