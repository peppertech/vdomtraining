// @ts-nocheck
import { h } from 'preact';

export const convertersBigDecimalConverterRecipe = (
  <>
    <p>
      <code className={"prettyprint"}>oj-c-input-text</code>{' '}
      can be configured to use an instance of BigDecimalStringConverter by setting its{' '}
      <code className={"prettyprint"}>converter</code>{' '}
      attribute as follows:
    </p>
    <ol>
      <li>In the ViewModel include the 'ojs/ojconverter-nativenumber' module.</li>
      <li>
        Set the number converter like this{' '}
        <code>converter='[[currencyConverter]]'</code>{' '}
        and in the ViewModel{' '}
        <code className={"prettyprint"}>
          this.currencyConverter= new BigDecimalStringConverter({'{'} style:"currency", currency:"EUR",
          currencyDisplay:"symbol"{'}'});
        </code>
      </li>
    </ol>
    <span>Other things to note about this demo:</span>
    <ul>
      <li>
        BigDecimalStringConverter parses a string value to return a string representation of the number.
        Therefore, it should only be used with a component whose expected value is a string, such as
        oj-c-input-text.
      </li>
      <li>
        In these tests, all the currency demos are bound to the same observable, and all the decimals
        are bound to the same observable, etc.
      </li>
      <li>
        If using{' '}
        <code className={"prettyprint"}>decimalFormat:'short'</code>{' '}
        or{' '}
        <code className={"prettyprint"}>decimalFormat:'long'</code>, set the component to{' '}
        <code className={"prettyprint"}>readonly</code>. Otherwise the user will see an error.
      </li>
    </ul>
    <p>
      See also{' '}
      <a href={"#"}>the Input Text Component Demo.</a>
    </p>
  </>
);
