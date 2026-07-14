import 'preact';

export const convertersNumberConverterDescription = (
  <>
    <p>
      This demo shows how JET&apos;s IntlNumberConverter can be used with Oracle JET editable value
      components using the component&apos;s <code className={'prettyprint'}>converter</code>{' '}
      option.
    </p>

    <p>
      When a converter is not specified explicitly the <a href={'#'}>oj-input-number component</a>{' '}
      creates an implicit instance of IntlNumberConverter as the default.
    </p>

    <p>
      Please note that a new native NumberConverter is available that delegates to
      Intl.NumberFormat and is lighter weight than the legacy IntlNumberConverter, which included
      its own CLDR data. It is strongly recommended that you switch to using the native converter as
      soon as possible. IntlNumberConverter is planned to be deprecated in a future release of
      Oracle JET.
    </p>

    <h2>Test Steps</h2>
    <ol>
      <li>
        Enter an incorrect value. For example, type &quot;ab&quot; and tab off the fields below to
        see a converter error.
      </li>
      <li>
        Enter valid data in the field and tab off to clear the error. The red border is removed and
        the error no longer displays. The number format has been converted.
      </li>
    </ol>
    <p>
      <code className={'prettyprint'}>decimalFormat:&apos;short&apos;</code> and{' '}
      <code className={'prettyprint'}>decimalFormat:&apos;long&apos;</code> converters support{' '}
      <code className={'prettyprint'}>format</code>, but not{' '}
      <code className={'prettyprint'}>parse</code>. You can only use these options with a readOnly
      component; otherwise, you will see an error.
    </p>
    <p>
      By default, rounding is HALF_UP and occurs during format, not parse. To round during parse
      (to keep data in sync with display value) set{' '}
      <code className={'prettyprint'}>roundDuringParse: true</code>
    </p>
    <strong>NOTE:</strong> If the user input does not match the expected value exactly, the number
    converter will attempt to parse the input according to its leniency rules. For details refer to
    the documentation.
  </>
);
