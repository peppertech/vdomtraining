import 'preact';

export const validationGroupDynamicFormValidationRecipe = (
  <>
    <ul>
      <li>
        Add an
        {' '}<code className={"prettyprint"}>oj-bind-for-each</code>{' '}
        element and use it to stamp out form components you want to dynamically add or remove.
      </li>
      <li>
        Surround this and any other form components you have on the page with an
        {' '}<code className={"prettyprint"}>oj-validation-group</code>{' '}
        element.
      </li>
      <li>
        Use the
        {' '}<code className={"prettyprint"}>oj-validation-group</code>{' '}
        element's valid property to track the form's valid state.
      </li>
    </ul>
  </>
);
