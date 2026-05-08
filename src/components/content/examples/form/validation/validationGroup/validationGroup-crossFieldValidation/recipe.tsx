import { h } from 'preact';

export const validationGroupCrossFieldValidationRecipe = (
  <>
    <div id={"componentDescription12"}>
      <p>
        The demo HTML markup references the following methods defined in the view model, which are
        explained in detail in the View Model Implementation Notes section.
      </p>
      <ul>
        <li>
          <b>createNewMember</b>
          : A handler set on the ko click binding of the Create button to perform best practices
          validation.
        </li>
      </ul>
    </div>

    <div id={"componentDescription2"}>
      <h3>CrossFieldValidator Validator</h3>
      An instance of this validator is created for emailAddress and phoneNumber observables. The
      validator throws an error when the value of observable is required to be non-empty.

      <p></p>
      <strong>NOTE:</strong>{' '}
      The mechanism used to perform app-level cross-field validation is entirely left to the discretion
      of the app developer, as long as the component is notified of validation failures using the
      {' '}<code className={"prettyprint"}>messages-custom</code>{' '}
      attribute on the component.
    </div>

    <div id={"componentDescription4"}>
      <h3>View Model Implementation Notes</h3>

      <h4>createNewMember Handler</h4>
      <p>
        Click handler set on the Knockout click binding for the Create button. The method implements the
        best practices for form validation by doing the following:
      </p>
      <ul>
        <li>
          Step 1: Shows deferred messages on all components tracked. If there are no deferred errors
          proceeds to next step.
        </li>
        <li>
          Step 2: Performs app level cross-field validations. If validation fails the method updates the
          {' '}<code className={"prettyprint"}>messages-custom</code>{' '}
          attribute ko binding. If app-level validation passes proceeds to next step.
        </li>
        <li>Step 3: Form controls are valid and is ready to be submitted.</li>
      </ul>
      <p>
        NOTE: The server could return with more validation errors which would require updating the
        {' '}<code className={"prettyprint"}>messages-custom</code>{' '}
        attribute. The above example does not show this as it's merely meant to illustrate the
        mechanisms by which the app can be notified of component errors and conversely how the app can
        notify the jet components/framework of business validation errors.
      </p>

      <h4>clearMessagesOnDependentsOfContactPref</h4>
      <p>
        A Knockout subscriber added to the contactPref observable to ensure that when its value changes
        any custom messages on the dependent observables are cleared. For example, when contactPref is
        set to 'email', the
        {' '}<code className={"prettyprint"}>messages-custom</code>{' '}
        attribute for Phone Number field is cleared. Similarly when contactPref is set to 'phone', the
        {' '}<code className={"prettyprint"}>messages-custom</code>{' '}
        on Email Address field is cleared.
      </p>
    </div>
  </>
);
