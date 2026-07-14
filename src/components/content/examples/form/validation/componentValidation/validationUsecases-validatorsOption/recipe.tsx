import 'preact';

export const validationUsecasesValidatorsOptionRecipe = (
  <>
    <ul>
      <li>
        Set the
        {' '}<code className={"prettyprint"}>validators</code>{' '}
        attribute on the component to an array containing a list of validator instances. E.g., the
        Username field is set to
        {' '}<code className={"prettyprint"}>validators='[[userNameValidators]]'</code>
        , where 'userNameValidators' is a computed observable that returns an Array with the validators.
      </li>
    </ul>
  </>
);
