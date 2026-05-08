import { h } from 'preact';

export const validationUsecasesValidatorsOptionDescription = (
  <>
    This demo shows the behavior of an editable form control when validators option changes due to
    programmatic intervention.

    <p></p>

    <div id={"desc"}>
      <oj-collapsible id={"c1"} expanded>
        <h4 slot={"header"}>Example 1: Username has deferred error and validators changes</h4>
        <div>
          <ul>
            <li>
              Set focus on the Username field and notice the field has a validator hint asking user to
              enter at least 4 characters.
            </li>
            <li>
              Click on 'Change Validators on Username' button. This changes the pattern used by the
              validator to accept a minumum of 3 characters for Username. Notice placeholder and hint
              change.
              <ul>
                <li>
                  No errors are flagged because the component is not showing an error, and validation is
                  not run. Deferred validation uses the implicit required validator, which did not
                  change.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"c2"}>
        <h4 slot={"header"}>
          Example 2: Weight has no error and validators option changes making the value invalid.
        </h4>
        <div>
          <ul>
            <li>
              Set focus on the Weight field. Notice the field has a validator hint to enter a number
              greater than 100.
            </li>
            <li>
              Click on 'Change Validators on Weight' button. This changes the min property used by the
              validator to 150, which is greater than the current value. Notice placeholder and hint
              change but no error is flagged for the current value.

              <ul>
                <li>
                  This is because when a component is valid no validation is run pre-emptively. Page
                  author is expected to set valid values for validators option that won't invalidate the
                  value set on the component.
                </li>
              </ul>
            </li>
            <li>Refresh page (F5).</li>
            <li>
              Click on 'Verify Weight' button. This adds a custom error message to the weight field.
              Notice the Weight component shows an app error.
            </li>
            <li>
              Click on 'Change Validators on Weight' button. The min property used by the validators is
              now set to 150. Notice now the component shows 2 errors.

              <ul>
                <li>
                  When component is invalid validation is run pre-emptively on the display value. The
                  custom error message added in the previous step is not cleared.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"c3"}>
        <h4 slot={"header"}>Example 3: Username is showing error and validators option changes.</h4>
        <div>
          <ul>
            <li>Refresh page (F5).</li>
            <li>Enter a value with 3 characters and tab off - 'abc'. Notice the field has an error.</li>
            <li>
              Click on 'Change Validators on Username' button. Notice that the error is cleared and
              value pushed to the model.

              <ul>
                <li>
                  When component is showing error, full validation is run on the display value. Since it
                  now passes all validation the value is saved to the option and the observable updated.
                </li>
                <li>
                  NOTE: Custom messages are not cleared when the value is updated indirectly. App can
                  listen to the
                  {' '}<code className={"prettyprint"}>optionChange</code>{' '}
                  event for the
                  {' '}<code className={"prettyprint"}>value</code>{' '}
                  option and clear it.
                </li>
              </ul>
            </li>
            <li>Refresh page again(F5).</li>
            <li>Enter a value with 4 characters and tab off - 'abcd'. Notice value is saved.</li>
            <li>Clear the value and tab-off. Notice that required error is flagged.</li>
            <li>
              Click on 'Change Validators on Username' button. Notice that the error is not cleared and
              continues to show.

              <ul>
                <li>
                  When component is showing error, full validation is run on the display value. Since it
                  is empty it fails required validation.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </oj-collapsible>
    </div>
  </>
);
