import { h } from 'preact';

export const validationUsecasesResetMethodDescription = (
  <>
    This demo shows the behavior of an editable form control when its
    <code className={"prettyprint"}>reset</code>
    method is called.
    <p></p>

    <div id={"desc"}>
      <oj-collapsible id={"collapsibleInfo"} expanded>
        <h4 slot={"header"}>Step 1: Components initialized with empty values, User clicks 'Reset'</h4>
        <div>
          <ul>
            <li>
              Components with
              <code className={"prettyprint"}>required</code>
              set and empty initially have deferred errors which are not shown to the user. The
              <code className={"prettyprint"}>valid</code>
              property is "invalidHidden"
            </li>
            <li>Hit 'Reset'. Notice all components remain in the same state.</li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"collapsibleInfo2"}>
        <h4 slot={"header"}>Step 2: App adds custom message, followed by 'Reset'</h4>
        <div>
          <ul>
            <li>
              Click 'Add Custom Message' button - this mimics app adding custom warning messages to both
              components.
            </li>
            <li>
              Click 'Reset' button. All custom messages are cleared - app messages added using
              <code className={"prettyprint"}>messagesCustom</code>
              property are cleared when reset is called.
            </li>
            <li>The component continues to have deferred errors</li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"collapsibleInfo3"}>
        <h4 slot={"header"}>Step 3: User enters invalid values in both components and clicks Reset</h4>
        <div>
          <ul>
            <li>Enter invalid value in both components and tab out. E.g. 'ab'</li>
            <li>
              The component shows a converter error; no longer has deferred errors; the component's
              <code className={"prettyprint"}>valid</code>
              property is 'invalidShown'
            </li>
            <li>
              Click 'Reset'
              <ul>
                <li>Tip: As a variation click on 'Add Custom Message' before clicking on 'Reset'</li>
              </ul>
            </li>
            <li>
              Notice both fields are reset to component's current value, which is still null. The
              component's
              <code className={"prettyprint"}>valid</code>
              property is 'invalidHidden'.
              <ul>
                <li>
                  A UI value is written to the component option, only when it passes all validation
                  rules set on the component.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"collapsibleInfo4"}>
        <h4 slot={"header"}>
          Step 4: User enters a combination of valid and invalid values and clicks 'Reset'
        </h4>
        <div>
          <ul>
            <li>Enter a valid value in the Age field and tab out. E.g., 25</li>
            <li>Enter an invalid value in the Weight field and tab out. E.g., 25</li>
            <li>Click 'Reset'</li>
            <li>
              The Age field has the last valid value. The error on Weight component is cleared and its
              value set to null
            </li>
            <li>
              Alternate the first 2 steps, i.e., enter a valid value for Weight and invalid for Age, and
              click 'Reset'
            </li>
          </ul>
        </div>
      </oj-collapsible>
    </div>
  </>
);
