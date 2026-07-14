import 'preact';

export const validationGroupFormFieldsValidationDescription = (
  <>
    <p>A validation group tracks and summarizes the current validity state of a group of components.</p>
    <p>
      This demos the
      {' '}<code className={"prettyprint"}>oj-validation-group</code>
      {' '}api, like the
      {' '}<code className={"prettyprint"}>valid</code>
      {' '}property, and the
      {' '}<code className={"prettyprint"}>showMessages()</code>
      {' '}and
      {' '}<code className={"prettyprint"}>focusOn("@firstInvalidShown")</code>
      {' '}methods.
    </p>
    <p>
      It also shows how you can confirm that two email fields match. Type in a value in the
      first Email field and type a different value in the second Email field and blur. You
      will see an error message under the second Email field.
    </p>
  </>
);
