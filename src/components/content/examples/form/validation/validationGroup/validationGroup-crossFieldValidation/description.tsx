import { h } from 'preact';

export const validationGroupCrossFieldValidationDescription = (
  <>
    <p>A validation group tracks and summarizes the current validity state of a group of components.</p>This demo shows an example of a simple cross-field business validation between 3 fields (Best
    Reached By, Email Address and Phone Number) implemented entirely in the view model. The cross-field
    validation works as follows:
    <ul>
      <li>When 'Best Reached By' is set to 'Email', the 'Email Address' field is required.</li>
      <li>When 'Best Reached By' is set to 'Phone', the 'Phone Number' field is required.</li>
    </ul>
    <p></p>
    To show cross-field validation errors on the components the demo makes use of the following
    features:
    <ul>
      <li>
        <b><code className={"prettyprint"}>messages-custom</code></b>
        attribute is used to set application messages on 'Email Address' and 'Phone Number' components
        to push business validation errors.
      </li>
      <li>
        <b><code className={"prettyprint"}>messages-custom</code></b>
        attribute can also be used to push business validation errors after they come back from the
        server; e.g., async validation. As soon as messages are added to
        <code className={"prettyprint"}>messages-custom</code>
        , the messages are displayed to the user (under the component by default). And if the messages
        are error messages, the component's
        <code className={"prettyprint"}>valid</code>
        property will be "invalidShown". Unlike failures in the validators added to the
        <code className={"prettyprint"}>validators</code>
        attribute, adding
        <code className={"prettyprint"}>messages-custom</code>
        messages does not prevent the component's value from being sent to the viewModel.
        <code className={"prettyprint"}>messages-custom</code>
        is meant for cross-field or page level validation.
      </li>
      <li>
        <b><code className={"prettyprint"}>oj-validation-group</code></b>
        element is used to track the validity of the fields. The element needs to surround the fields
        you want to track. The properties and methods provided by the
        <code className={"prettyprint"}>oj-validation-group</code>
        element are used to control the Create button behavior, and its methods are used to set focus on
        the invalid field.
        <ul>
          <li>
            Clicking on the button runs cross-field validation and sets focus on the invalid component
            if there is a failure.
          </li>
        </ul>
      </li>
    </ul>
  </>
);
