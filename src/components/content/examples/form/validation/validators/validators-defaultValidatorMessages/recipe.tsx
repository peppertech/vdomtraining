import { h } from 'preact';

export const validatorsDefaultValidatorMessagesRecipe = (
  <>
    <span>
      Consult the following demos for more information on the specific Validators, including how to
      override the default hint and messages.
    </span>
    <ul>
      <li>
        <a href={"#"}>
          LengthValidator
        </a>{' '}
        demo.
      </li>
      <li>
        <a href={"#"}>
          NumberRangeValidator
        </a>{' '}
        demo.
      </li>
      <li>
        The RegExpValidator has no default hint, and the default message shows the regexp pattern, so it
        is highly recommended to pass in a hint and messageDetail when creating a RegExpValidator. For
        details on this, see the{' '}
        <a href={"#"}>
          RegExpValidator
        </a>{' '}
        demo.
      </li>
      <li>
        <a href={"#"}>
          RequiredValidator
        </a>{' '}
        demo.
      </li>
    </ul>
    <span>
      Consult the{' '}
      <a href={"#"}>
        Default Converter Messages
      </a>{' '}
      demo for information about the default Converter hints and messages.
    </span>
  </>
);
