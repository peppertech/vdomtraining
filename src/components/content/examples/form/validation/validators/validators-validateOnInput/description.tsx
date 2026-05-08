import { h } from 'preact';

export const validatorsValidateOnInputDescription = (
  <>
    <p>
      This demo shows how to validate the length of input on{' '}
      <code className={"prettyprint"}>oj-c-input-text</code>{' '}
      as the user types by using a{' '}
      <code className={"prettyprint"}>rawValueChanged</code>{' '}
      listener to call{' '}
      <code className={"prettyprint"}>validate()</code>.
    </p>
    <p>
      When the length of the field exceeds the maximum length, an inline error message is displayed.
    </p>
  </>
);
