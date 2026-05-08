// @ts-nocheck
import { h } from 'preact';

export const convertersNativeNumberConverterDescription = (
  <>
    <p>
      This demo shows how JET's native NumberConverter can be used with Oracle JET editable value
      components such as oj-c-input-number by using the component's
      <code className={"prettyprint"}>converter</code>
      option.
    </p>

    <p>
      When a converter is not specified explicitly the
      <a href={"#"}>
        oj-c-input-number component
      </a>
      creates an implicit instance of native NumberConverter as the default.
    </p>

    <h2 className={"oj-typography-heading-sm"}>Test Steps</h2>
    <ol>
      <li>
        Enter an incorrect value. For example, type "ab" and tab off the fields below to see a converter
        error.
      </li>
      <li>
        Enter valid data in the field and tab off to clear the error. The red border is removed and the
        error no longer displays. The number format has been converted.
      </li>
    </ol>
    <p>
      <code className={"prettyprint"}>decimalFormat:'short'</code>
      and
      <code className={"prettyprint"}>decimalFormat:'long'</code>
      converters support
      <code className={"prettyprint"}>format</code>
      , but not
      <code className={"prettyprint"}>parse</code>
      . You can only use these options with a readOnly component; otherwise, you will see an error.
    </p>
    <p>
      By default, rounding is HALF_UP and occurs during format, not parse. To round during parse (to
      keep data in sync with display value) set
      <code className={"prettyprint"}>roundDuringParse: true</code>
    </p>
    <strong>NOTE:</strong>
    If the user input does not match the expected value exactly, the number converter will attempt to
    parse the input according to its leniency rules. For details refer to the documentation.
  </>
);
