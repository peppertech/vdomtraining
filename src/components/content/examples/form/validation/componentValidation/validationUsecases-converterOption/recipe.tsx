import { h } from 'preact';

export const validationUsecasesConverterOptionRecipe = (
  <>
    Use the
    <code className={"prettyprint"}>converter</code>
    attribute as explained below.
    <ul>
      <li>
        Set the
        <code className={"prettyprint"}>converter</code>
        attribute on the element to an object that is an instance of Converter or duck-types it. E.g.,
        <code className={"prettyprint"}>converter= [[dateConverter]]</code>
        , where 'dateConverter' is a computed observable that is an instance of the
        IntlDateTimeConverter.
      </li>
    </ul>
  </>
);
