// @ts-nocheck
import { h } from 'preact';

export const convertersNativeNumberConverterRecipe = (
  <>
    <p>
      <code className={"prettyprint"}>oj-c-input-number</code>
      has a default
      <code className={"prettyprint"}>NumberConverter</code>
      instance.
    </p>
    <p>If you want to override the default NumberConverter instance you need to do the following.</p>
    <ol>
      <li>In the ViewModel include the 'ojs/ojconverter-nativenumber' module.</li>
      <li>
        Set the number converter like this
        <code>converter='[[currencyConverter]]'</code>
        and in the ViewModel
        <code className={"prettyprint"}>
          this.currencyConverter= new NumberConverter({'{'} style:"currency", currency:"EUR",
          currencyDisplay:"symbol"{'}'});
        </code>
      </li>
    </ol>
    <span>Other things to note about this demo:</span>
    <ul>
      <li>
        In these tests, all the currency demos are bound to the same observable, and all the decimals
        are bound to the same observable, etc.
      </li>
      <li>
        If using
        <code className={"prettyprint"}>decimalFormat:'short'</code>
        or
        <code className={"prettyprint"}>decimalFormat:'long'</code>
        , set the component to
        <code className={"prettyprint"}>readonly</code>
        . Otherwise the user will see an error.
      </li>
    </ul>
    <p>
      See also
      <a href={"#"}>
        the Input Number Component Demo.
      </a>
    </p>
  </>
);
