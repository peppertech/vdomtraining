import { h } from 'preact';

export const validationUsecasesValueOptionRecipe = (
  <>
    <ul>
      <li>
        Set the
        <code className={"prettyprint"}>value</code>
        attribute to a value whose data type matches what's expected by the component. E.g., for
        oj-input-date the value is a iso date string -
        <code className={"prettyprint"}>value='{'{'}{'{'}startDate{'}'}{'}'}'</code>
        , where startDate is a ko observable that returns an iso date.
      </li>
    </ul>
  </>
);
