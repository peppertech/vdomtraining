import { h } from 'preact';

export const validationUsecasesValueOptionDescription = (
  <>
    This demo shows the behavior of an editable form control when
    <code className={"prettyprint"}>value</code>
    changes due to programmatic intervention and due to user action.
    <p></p>
    <p>
      When the
      <code className={"prettyprint"}>value</code>
      property changes due to programmatic intervention, the component always clears all messages
      including messagesCustom, runs deferred validation, and always refreshes UI display value. When
      the
      <code className={"prettyprint"}>value</code>
      property changes as a result of user interaction all messages are cleared, including custom
      messages added by the app, and full validation is run on the UI value.
    </p>

    <p></p>
    In the demo neither Start nor End Date can fall on a weekend - both dates have a validator -
    'weekendDateValidator', that ensures this. The End Date field also has a validator -
    endDateValidator, that ensures that its value always falls on or after Start Date.

    <p></p>

    <div id={"desc"}>
      <oj-collapsible id={"c1"} expanded>
        <h4 slot={"header"}>Step 1: Components start out with correct values</h4>
        <div>
          <ul>
            <li>
              Change the 'Number of Days'
              <ul>
                <li>Notice End Date is updated by the app.</li>
              </ul>
            </li>
            <li>
              Change End Date to be a weekend. Error is shown. Full validation is run when user changes
              the value.
            </li>
            <li>
              Now change Start Date to a different week day. App updates End Date programmatically.
              <ul>
                <li>All component errors are cleared.</li>
                <li>
                  Full validation is not run. This is because when the value is changed programmatically
                  by app the framework expects that app to set a valid value that validates correctly.
                  So the framework only runs deferred validation.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"c2"}>
        <h4 slot={"header"}>Step 2: App sets incorrect value on component</h4>
        <div>
          <ul>
            <li>Change End Date to be a weekend. Error is shown.</li>
            <li>Click on 'Set Weekend End Date!!' button. App code sets End Date to be a weekend.</li>
            <li>
              Notice error is no longer shown even though End Date falls on a weekend.
              <ul>
                <li>
                  This is because when the value is changed programmatically by app the framework
                  expects that app to set a valid value that validates correctly. So the framework only
                  runs deferred validation.
                </li>
              </ul>
            </li>
            <li>Clear Start Date and tab off. Required error is shown.</li>
            <li>
              Now click on 'Set Weekend Start Date!!' button. App code sets Start Date to be a weekend.
              Again no error is shown for the same reason explained above.
            </li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"c3"}>
        <h4 slot={"header"}>Step 3: App clears value on all components</h4>
        <div>
          <ul>
            <li>Clear Start Date and tab off. Required error is shown.</li>
            <li>Choose a weekend date for End Date. Error is shown.</li>
            <li>
              Click on 'Create New Task!!' button. App sets null values for Start Date and End Date.
            </li>
            <li>
              Notice all component errors are now gone. Also required components ran deferred validation
              - Start Date now has deferred error.
            </li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"c4"}>
        <h4 slot={"header"}>Step 4: App adds custom error to date components</h4>
        <div>
          <ul>
            <li>
              Click on 'Add Custom Message' to mimic app adding custom messages. Select a valid start
              date and try the previous 3 steps.
            </li>
            <li>
              Notice that custom messages are cleared when user interacts with component that has the
              error or the value changes programmatically.
            </li>
          </ul>
        </div>
      </oj-collapsible>
    </div>
  </>
);
