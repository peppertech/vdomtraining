import { h } from 'preact';

export const validatorsRequiredValidatorDescription = (
  <>
    <p>This demo shows how JET's RequiredValidator can be used with Oracle JET editable components.</p>

    <p>
      A RequiredValidator is created implicitly by components that support a{' '}
      <code className={"prettyprint"}> required </code>{' '}
      option. Page authors can customize the hint and message texts used by the validator using the
      {' '}<code className={"prettyprint"}> required-message-detail </code>{' '}
      option.
    </p>

    <h2>Test Steps</h2>
    <ol>
      <li>To see the error text for a required validator, clear the value and step off the field.</li>
    </ol>
  </>
);
