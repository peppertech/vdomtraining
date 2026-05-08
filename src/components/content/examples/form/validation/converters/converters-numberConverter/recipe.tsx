import { h } from 'preact';

export const convertersNumberConverterRecipe = (
  <>
    <p>
      <code className={'prettyprint'}>oj-input-number</code> has a default{' '}
      <code className={'prettyprint'}>IntlNumberConverter</code> instance.
    </p>
    <p>If you want to override the default IntlNumberConverter instance you need to do the following.</p>
    <ol>
      <li>In the ViewModel include the &apos;ojs/ojconverter-number&apos; module.</li>
      <li>
        Set the number converter like this <code>converter=&apos;[[currencyConverter]]&apos;</code>{' '}
        and in the ViewModel{' '}
        <code className={'prettyprint'}>
          this.currencyConverter= new NumberConverter.IntlNumberConverter({'{'} style:&quot;currency&quot;,
          currency:&quot;EUR&quot;, currencyDisplay:&quot;symbol&quot;{'}'});
        </code>
      </li>
    </ol>
    <span>Other things to note about this demo:</span>
    <ul>
      <li>
        In these tests, all the currency demos are bound to the same observable, and all the
        decimals are bound to the same observable, etc.
      </li>
      <li>
        If using <code className={'prettyprint'}>decimalFormat:&apos;short&apos;</code> or{' '}
        <code className={'prettyprint'}>decimalFormat:&apos;long&apos;</code>, set the component to{' '}
        <code className={'prettyprint'}>readonly</code>. Otherwise the user will see an error.
      </li>
    </ul>
    <p>
      See also <a href={'#'}>the Input Number Component Demo.</a>
    </p>
  </>
);
