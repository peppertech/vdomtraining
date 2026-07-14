import 'preact';

export const validationGroupRequiredFieldValidationDescription = (
  <>
    <p>A validation group tracks and summarizes the current validity state of a group of components.</p>
    <p>
      This demo shows form level validity checking using
      {' '}<code className={"prettyprint"}> oj-validation-group</code>. It also shows component
      required validation.
    </p>
    <h4>Test Steps</h4>
    <p>
      On page load the fields are empty and are marked Required. The
      {' '}<code className={"prettyprint"}> oj-validation-group's</code>{' '}
      <code className={"prettyprint"}> valid </code>{' '}
      property value is
      {' '}<code className={"prettyprint"}> invalidHidden</code>.
    </p>
    <p>
      Click the Submit button. The Required error messages are shown, and
      {' '}<code className={"prettyprint"}> oj-validation-group's</code>{' '}
      <code className={"prettyprint"}> valid </code>{' '}
      property value is
      {' '}<code className={"prettyprint"}> invalidShown </code>. The focus is on the first invalid
      field.
    </p>
  </>
);
