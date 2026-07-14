import 'preact';

export const validatorsCustomValidatorsRecipe = (
  <>
    <ul>
      <li>
        Set the Password field&apos;s{' '}
        <code className={"prettyprint"}>validators</code>{' '}
        option to a regexp validator that enforces the password rules.
      </li>
      <li>
        Create a custom validator object for the Confirm Password field and assign it through the{' '}
        <code className={"prettyprint"}>validators</code>{' '}
        option.
      </li>
      <li>
        Revalidate the Confirm Password field when the Password field changes and the confirm field
        already has a value.
      </li>
    </ul>
  </>
);
