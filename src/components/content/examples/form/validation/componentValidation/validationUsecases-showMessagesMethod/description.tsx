import 'preact';

export const validationUsecasesShowMessagesMethodDescription = (
  <>
    This demo shows how deferred messages can be displayed on an editable form control using the
    {' '}<code className={"prettyprint"}>showMessages()</code>{' '}
    method.

    <p></p>
    Both components have
    {' '}<code className={"prettyprint"}>required</code>{' '}
    set and have empty values. Required validation runs preemptively and errors are hidden. And when
    errors are hidden and none are shown, the component's
    {' '}<code className={"prettyprint"}>valid</code>{' '}
    property is
    {' '}<code className={"prettyprint"}>invalidHidden</code>
    .
    <p></p>

    <p>
      NOTE: You can instead use
      {' '}<code className={"prettyprint"}>oj-validation-group</code>{' '}
      to group the form components so you can get the
      {' '}<code className={"prettyprint"}>valid</code>{' '}
      property and call
      {' '}<code className={"prettyprint"}>showMessages()</code>{' '}
      on the group instead of on each component.
    </p>
  </>
);
