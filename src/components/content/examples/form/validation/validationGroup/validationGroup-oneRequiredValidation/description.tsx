import { h } from 'preact';

export const validationGroupOneRequiredValidationDescription = (
  <>
    <p>A validation group tracks and summarizes the current validity state of a group of components.</p>
    <p>
      The property and methods provided by the
      <code className={"prettyprint"}>oj-validation-group</code>
      are used to check the
      <code className={"prettyprint"}>valid</code>
      state of the form components as a whole, show hidden messages (i.e., deferred required
      validation failures not yet shown to the user), and set focus on the first invalid field
      showing messages.
      <code className={"prettyprint"}>oj-validation-group</code>
      does not perform validation.
    </p>
    <p>This demo shows a few things:</p>
    <ul>
      <li>
        Form level
        <b>validity checking</b>
        using
        <code className={"prettyprint"}>oj-validation-group</code>.
      </li>
      <li>
        <b>Cross-field validation</b>
        using the
        <code className={"prettyprint"}>messagesCustom</code>
        property and the
        <code className={"prettyprint"}>on-value-changed</code>
        attribute.
      </li>
      <li>
        Component
        <b>required validation</b>
        using the component's
        <code className={"prettyprint"}>required</code>
        attribute. This validates whether the one field is filled in, not to cross-field
        validate.
      </li>
      <li>
        <b>Component validation</b>
        using the component's
        <code className={"prettyprint"}>validators</code>
        attribute. This is meant to validate the field&apos;s value on its own, not to
        cross-field validate.
      </li>
    </ul>

    <h4>Test Steps</h4>
    <p>
      Type in a value in one of the first three fields and press Enter. Clear out the field and press
      Enter, and you will immediately see the error message. This is implemented with the form
      components
      <code className={"prettyprint"}>oj-value-changed</code>
      attribute and the
      <code className={"prettyprint"}>messagesCustom</code>
      property.
    </p>
    <p>
      Correct the error by filling in a field and pressing Enter. Clear out the field and click
      the Submit button. You will see the error message and the focus will be on the first
      invalid field. This is implemented using the
      <code className={"prettyprint"}>oj-validation-group</code>
      component's property and methods. Notice the required inline message shows when you call
      <code className={"prettyprint"}>oj-validation-group</code>
      {' '}s
      <code className={"prettyprint"}>showMessages()</code>
      . It will also show up if the user clears a required field that had a value.
    </p>
    <p>
      Refresh the page. Type in 'a' in the Odd Field and blur or press Enter. You will see an inline
      error message right away. This is implemented using the component&apos;s
      <code className={"prettyprint"}>validators</code>
      attribute. oj-input-text components run their validators on Enter or Blur.
    </p>
    <p>
      Note: Unlike failures in the validators added to the component&apos;s
      <code className={"prettyprint"}>validators</code>
      attribute, adding
      <code className={"prettyprint"}>messagesCustom</code>
      messages do not prevent the component&apos;s
      <code className={"prettyprint"}>value</code>
      from being sent to the viewModel.
    </p>
  </>
);
