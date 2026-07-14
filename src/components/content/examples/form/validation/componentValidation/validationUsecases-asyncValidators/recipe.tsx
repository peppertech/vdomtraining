import 'preact';

export const validationUsecasesAsyncValidatorsRecipe = (
  <>
    Use the element&apos;s
    {' '}<code className={"prettyprint"}>validators</code>{' '}
    attribute.
    <ul>
      <li>
        Create an object that duck-types Validator. Its
        {' '}<code className={"prettyprint"}>validate</code>{' '}
        method throws an error if the value is 500. Set this on the
        {' '}<code className={"prettyprint"}>validators</code>{' '}
        attribute.
      </li>
      <li>
        Create an object that duck-types AsyncValidator. Its
        {' '}<code className={"prettyprint"}>validate</code>{' '}
        method throws an error if the value is less than 100 or greater than 10000. Simulate a
        server delay by using
        {' '}<code className={"prettyprint"}>setTimeout</code>{' '}
        and set this on the
        {' '}<code className={"prettyprint"}>validators</code>{' '}
        attribute as well.
      </li>
      <li>
        Type into the field and blur it to see the async validation delayed by the mocked
        server-side wait.
      </li>
    </ul>
  </>
);
