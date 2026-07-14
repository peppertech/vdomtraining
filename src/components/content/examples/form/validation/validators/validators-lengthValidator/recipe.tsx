import 'preact';

export const validatorsLengthValidatorRecipe = (
  <>
    <ol>
      <li>
        Use{' '}
        <code className={"prettyprint"}>min</code>{' '}
        and{' '}
        <code className={"prettyprint"}>max</code>{' '}
        to set the range.
      </li>
      <li>
        Set the{' '}
        <code className={"prettyprint"}>countBy</code>{' '}
        option either on a per-component basis using the length validator's options or to set it
        page-wide, use{' '}
        <code className={"prettyprint"}>LengthValidator.defaults.countBy = 'codePoint';</code>.
      </li>
    </ol>
    NOTE:
    <ul>
      <li>
        This demo validates the input text value and displays error message when the length of the value
        does not satisfy the specified criteria. Also, this does not restrict the user from entering
        characters beyond max length.
      </li>
      <li>
        To restrict the user from entering characters beyond a specified maximum length, refer to the{' '}
        <a href={"#"}>
          MaxLength on Input Text
        </a>{' '}
        and{' '}
        <a href={"#"}>
          MaxLength on Text Area
        </a>{' '}
        demos.
      </li>
    </ul>
  </>
);
