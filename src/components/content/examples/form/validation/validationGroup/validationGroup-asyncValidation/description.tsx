import { h } from 'preact';

export const validationGroupAsyncValidationDescription = (
  <>
    <p>A validation group tracks and summarizes the current validity state of a group of components.</p>
    <p>
      This demo shows how to use
      <code className={"prettyprint"}>oj-validation-group</code>
      when a form field has an asynchronous validator.
    </p>
    <h4>Test Steps</h4>
    <p>
      Notice on page load that the
      <code className={"prettyprint"}>oj-validation-group's</code>
      <code className={"prettyprint"}>valid</code>
      property value is
      <code className={"prettyprint"}>valid</code>
      .
    </p>
    <p>
      Click on the field to view the validator hint. Enter 12 (an invalid value). Note that leaving a
      field kicks off validation.
    </p>
    <p>
      While the asynchronous validator is validating, the
      <code className={"prettyprint"}>oj-validation-group's</code>
      <code className={"prettyprint"}>valid</code>
      property value is
      <code className={"prettyprint"}>pending</code>
      . In this demo, we disable the Submit button when
      <code className={"prettyprint"}>pending</code>
      , and submission is prevented when invalid.
    </p>
    <p>
      After the async validator completes, you will see the field's error message and the focus will be
      on the field. The
      <code className={"prettyprint"}>oj-validation-group's</code>
      <code className={"prettyprint"}>valid</code>
      property value is now
      <code className={"prettyprint"}>invalidShown</code>
      .
    </p>
  </>
);
