import 'preact';

export const validationUsecasesComponentCreateRecipe = (
  <>
    Use the element&apos;s
    {' '}<code className={"prettyprint"}>value</code>
    ,
    {' '}<code className={"prettyprint"}>required</code>{' '}
    and
    {' '}<code className={"prettyprint"}>validators</code>{' '}
    attributes.
    <ul>
      <li>
        Set the
        {' '}<code className={"prettyprint"}>required</code>{' '}
        attribute on the element.
      </li>
      <li>
        Set the
        {' '}<code className={"prettyprint"}>show-required</code>{' '}
        <code className={"prettyprint"}>value</code>{' '}
        attribute to a value whose data type matches what the component expects.
      </li>
      <li>
        Set the
        {' '}<code className={"prettyprint"}>validators</code>{' '}
        attribute on the element to an AsyncRegExpValidator. The Username field uses the validators
        attribute to set a regexp validator.
      </li>
    </ul>
  </>
);
