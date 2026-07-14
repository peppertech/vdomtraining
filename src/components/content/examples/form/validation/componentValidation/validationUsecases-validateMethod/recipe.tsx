import 'preact';

export const validationUsecasesValidateMethodRecipe = (
  <>
    <ul>
      <li>Create a listener for when the Submit button is clicked</li>
      <li>
        In that listener, call the validate() method on each element. validate() returns a Promise, so
        wait until one is done before calling the other. Once both are done and valid, then it is safe
        to submit the form.
      </li>
      <li>
        Running validation will automatically update the
        {' '}<code className={"prettyprint"}>valid</code>{' '}
        property.
      </li>
      <li>Running validation will automatically show messages, if any.</li>
    </ul>
  </>
);
