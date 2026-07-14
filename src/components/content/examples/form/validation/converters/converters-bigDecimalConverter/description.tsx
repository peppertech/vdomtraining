// @ts-nocheck
import 'preact';

export const convertersBigDecimalConverterDescription = (
  <>
    <p>
      This demo shows how JET's big decimal converter can be used with an input text component by
      setting the component's{' '}
      <code className={"prettyprint"}>converter</code>{' '}
      attribute.
    </p>
    <p>
      NumberConverter is used to parse a string into a number, and to format a number into a locale
      specific string. In contrast, BigDecimalStringConverter only deals with strings. For instance, it
      parses a string and returns a string representation of the number, because big decimals are too
      large to be represented using a Javascript number. You would only need to use this converter for
      very large numbers, such as numbers greater than Number.MAX_SAFE_INTEGER (9007199254740991), or
      numbers with large scale (greater than 17 fractional digits). Since it only deals with strings,
      BigDecimalStringConverter can only be used with a component whose expected value is a string, not
      a number, such as oj-c-input-text.
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
      <code className={"prettyprint"}>decimalFormat:'short'</code>{' '}
      and{' '}
      <code className={"prettyprint"}>decimalFormat:'long'</code>{' '}
      converters support{' '}
      <code className={"prettyprint"}>format</code>, but not{' '}
      <code className={"prettyprint"}>parse</code>. You can only use these options with a readOnly
      component; otherwise, you will see an error.
    </p>
    <p>
      By default, rounding is HALF_UP and occurs during format, not parse. To round during parse (to
      keep data in sync with display value) set{' '}
      <code className={"prettyprint"}>roundDuringParse: true</code>.
    </p>
    <p>
      <strong>NOTE:</strong>{' '}
      If the user input does not match the expected value exactly, the number converter will attempt to
      parse the input according to its leniency rules. For details refer to the documentation.
    </p>
  </>
);
