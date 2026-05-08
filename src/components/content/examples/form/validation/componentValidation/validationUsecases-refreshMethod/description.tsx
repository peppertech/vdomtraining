import { h } from 'preact';

export const validationUsecasesRefreshMethodDescription = (
  <>
    This demo shows the behavior of an editable form control when
    <code className={"prettyprint"}>refresh</code>
    method is called.

    <p></p>

    <div id={"desc"}>
      <oj-collapsible id={"c1"} expanded>
        <h4 slot={"header"}>
          Example 1: Username field has deferred error when label changes and refresh() called.
        </h4>
        <div>
          <ul>
            <li>Click on 'Change Label and Refresh' button. Notice the label changes.</li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"c2"}>
        <h4 slot={"header"}>Example 2: User enters invalid value; label changes and refresh() called.</h4>
        <div>
          <ul>
            <li>Refresh page (F5).</li>
            <li>Enter an invalid value - 'a' in Username field and tab-off. Notice field has error.</li>
            <li>Notice component shows error message using the title case label</li>
            <li>Click on 'Change Label and Refresh' button. Notice the label changes to uppercase.</li>
            <li>Notice component now shows the message using the new label</li>
          </ul>
        </div>
      </oj-collapsible>
    </div>
  </>
);
