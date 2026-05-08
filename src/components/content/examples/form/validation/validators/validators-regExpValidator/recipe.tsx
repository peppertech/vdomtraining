import { h } from 'preact';

export const validatorsRegExpValidatorRecipe = (
  <>
    <ul>
      <li>
        Use the tokens described in the RegExpValidator documentation to add more information to the
        hint, the messageSummary, and the messageDetail. For example, this demo uses the {'{'}value{'}'} and
        {'{'}pattern{'}'} tokens in the messageDetail.
      </li>
      <li>
        RegExpValidator purposely passes validation when value is null, undefined, or "" (empty string).
        If you want the field to fail validation if the user clears the field and tabs out, you need to
        chain another validator, like the required validator. Setting the field to required applies the
        required validator.
      </li>
    </ul>
  </>
);
