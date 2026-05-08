import { h } from 'preact';

export const validationUsecasesRequiredOptionDescription = (
  <>
    This demo shows the behavior of an editable form control when the
    {' '}<code className={"prettyprint"}>required</code>{' '}
    property changes due to programmatic intervention.

    <p></p>
    In the demo the required property on User Name field is toggled on/off.
    <p></p>

    <div id={"desc"}>
      <oj-collapsible id={"collapsibleInfo"} expanded>
        <h4 slot={"header"}>Example 1: Components initialized with empty value; App sets required.</h4>
        <div>
          <ul>
            <li>
              'User Name' is not required so it has no deferred hidden message. The component's
              {' '}<code className={"prettyprint"}>valid</code>{' '}
              property is 'valid'.
            </li>
            <li>
              Click 'Toggle Required' to make it required.
              <ul>
                <li>
                  The component's
                  {' '}<code className={"prettyprint"}>valid</code>{' '}
                  property is 'invalidHidden'.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"collapsibleInfo2"}>
        <h4 slot={"header"}>
          Example 2: User enters invalid value in 'User Name' and tabs out; App removes required
        </h4>
        <div>
          <ul>
            <li>Enter an invalid value in 'User Name' and tab out - e.g., 'ab'</li>
            <li>'User Name' shows validation error. Deferred errors are cleared.</li>
            <li>
              The component's
              {' '}<code className={"prettyprint"}>valid</code>{' '}
              property is 'invalidShown'.
            </li>
            <li>
              Click 'Toggle Required' to make 'User Name' not be required.
              <ul>
                <li>
                  Notice previous validation error on 'User Name' continues to show. This is because
                  'ab' continues to fail validation setup using the 'regExp' validator.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"collapsibleInfo3"}>
        <h4 slot={"header"}>
          Example 3: App sets required on 'User Name'; User clears field and tabs out; App removes
          required.
        </h4>
        <div>
          <ul>
            <li>
              Enter a valid value in 'User Name' and tab out - e.g., 'abc'. Value is now pushed to
              component.
            </li>
            <li>Click 'Toggle Required' to make 'User Name' required again.</li>
            <li>Clear the 'User Name' field and tab out. A required validation error is shown.</li>
            <li>
              Click 'Toggle Required' to make 'User Name' to not be required.
              <ul>
                <li>Notice required error that was previously shown is now be cleared.</li>
                <li>The empty value is now pushed to the model</li>
                <li>
                  The component's
                  {' '}<code className={"prettyprint"}>valid</code>{' '}
                  property is 'valid'.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </oj-collapsible>
    </div>
  </>
);
