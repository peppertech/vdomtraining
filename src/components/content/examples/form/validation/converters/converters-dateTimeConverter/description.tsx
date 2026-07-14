// @ts-nocheck
import 'preact';

export const convertersDateTimeConverterDescription = (
  <>
    <p>
      This demo shows how JET's datetime converter can be used with Oracle JET editable value components
      using the{' '}
      <code className={"prettyprint"}>converter</code>{' '}
      option.
    </p>

    <p>
      When a converter is not specified explicitly the{' '}
      <a href={"#"}>date and time input components</a>{' '}
      create an implicit datetime converter.
    </p>

    <h2>Test Steps</h2>
    <ol>
      <li>
        Enter an incorrect value. For example, type "ab" and tab off the fields below to see a converter
        error.
      </li>
      <li>
        Enter valid data in the field or clear the field and tab off to remove the error. The red border
        is removed and the error no longer displays. The date format has been converted.
      </li>
    </ol>
    <p>
      <strong>NOTE:</strong>{' '}
      If user input does not match the expected value exactly, the datetime converter will attempt to
      parse the input according to its leniency rules. For details refer to the API docs for the
      datetime converter.
    </p>
  </>
);
