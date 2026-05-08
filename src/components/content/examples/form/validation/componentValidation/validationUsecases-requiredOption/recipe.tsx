import { h } from 'preact';

export const validationUsecasesRequiredOptionRecipe = (
  <>
    <ul>
      <li>
        Set the
        <code className={"prettyprint"}>required</code>
        attribute on the component to a ko observable that returns a boolean. - E.g.,
        <code className={"prettyprint"}>required='[[userNameRequired]]'</code>
        , where 'userNameRequired' is a ko observable.
      </li>
    </ul>
  </>
);
