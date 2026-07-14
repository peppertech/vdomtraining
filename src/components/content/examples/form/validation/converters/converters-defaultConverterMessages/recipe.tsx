// @ts-nocheck
import 'preact';

export const convertersDefaultConverterMessagesRecipe = (
  <>
    <ul>
      <li>
        <code className={"prettyprint"}>oj-input-date</code>{' '}
        has an{' '}
        <code className={"prettyprint"}>IntlDateTimeConverter</code>{' '}
        by default.
      </li>
      <li>
        <code className={"prettyprint"}>oj-input-number</code>{' '}
        has an{' '}
        <code className={"prettyprint"}>IntlNumberConverter</code>{' '}
        by default.
      </li>
      <li>
        Add an{' '}
        <code className={"prettyprint"}>oj-input-text</code>. Set the{' '}
        <code className={"prettyprint"}>converter</code>{' '}
        property to whatever converter instance you want. In this demo it is set to a
        {' '}<code className={"prettyprint"}>new ColorConverter()</code>{' '}
        instance.
      </li>
    </ul>
    <p>Consult the following demos for more information on the specific Converters.</p>
    <ul>
      <li>
        <a href={"#"}>IntlDateTimeConverter</a>{' '}
        demo.
      </li>
      <li>
        <a href={"#"}>IntlNumberConverter</a>{' '}
        demo.
      </li>
      <li>
        <a href={"#"}>ColorConverter</a>{' '}
        demo.
      </li>
    </ul>
    <span>
      Consult the{' '}
      <a href={"#"}>Default Validator Messages</a>{' '}
      demo for information about the default Validator hints and messages.
    </span>
  </>
);
