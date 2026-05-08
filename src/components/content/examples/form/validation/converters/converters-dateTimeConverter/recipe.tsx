// @ts-nocheck
import { h } from 'preact';

export const convertersDateTimeConverterRecipe = (
  <>
    <p>
      <code className={"prettyprint"}>oj-input-datetime</code>{' '}
      and{' '}
      <code className={"prettyprint"}>oj-input-time</code>{' '}
      have a default{' '}
      <code className={"prettyprint"}>IntlDateTimeConverter</code>{' '}
      instance.
    </p>
    <p>
      If you want to override the default IntlDateTimeConverter instance you need to do the following.
    </p>
    <ol>
      <li>In the ViewModel include the 'ojs/ojconverter-datetime' module.</li>
      <li>
        Set the component's converter attribute like this{' '}
        <code className={"prettyprint"}>converter='[[dateTimeNumericConverter]]'</code>{' '}
        and in the ViewModel create the IntlDateTimeConverter instance in the ViewModel. For example,{' '}
        <code className={"prettyprint"}>
          this.dateTimeNumericConverter = new DateTimeConverter.IntlDateTimeConverter({'{'} year: "numeric",
          month: "long", day: "numeric" {'}'});
        </code>
      </li>
    </ol>
    <p>
      See also{' '}
      <a href={"#"}>the Input DateTime Component Demo</a>{' '}
      and{' '}
      <a href={"#"}>the Input Time Component Demo.</a>
    </p>
  </>
);
