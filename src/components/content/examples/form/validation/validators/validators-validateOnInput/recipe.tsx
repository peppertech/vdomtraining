import 'preact';

export const validatorsValidateOnInputRecipe = (
  <>
    <ol>
      <li>
        Create and add a LengthValidator to the{' '}
        <code className={"prettyprint"}>validators</code>{' '}
        attribute on the element.
      </li>
      <li>
        Add a listener to the{' '}
        <code className={"prettyprint"}>rawValueChanged</code>{' '}
        event on the element to invoke validation.
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
