// @ts-nocheck
import { h } from 'preact';

export const dialogCancelBehaviorRecipe = (
  <>
    <ul>
      <li>
        Use the
        {" "}
        <code className={"prettyprint"}>oj-dialog</code>
        {" "}
        element to create a
        {" "}
        <code className={"prettyprint"}>dialog</code>
        {" "}
        component.
      </li>
      <li>
        Create a child element with with
        {" "}
        <code className={"prettyprint"}>slot='body'</code>
        , and define your body content within this element.
      </li>
      <li>
        Configure how to launch the dialog: Call the dialog's
        {" "}
        <code className={"prettyprint"}>open</code>
        {" "}
        method (
        {" "}
        <code className={"prettyprint"}>dialogElement.open()</code>
        {" "}
        ) to open the dialog.
      </li>
      <li>
        Configure the dialog's cancel behavior by setting
        {" "}
        <code className={"prettyprint"}>cancel-behavior="icon"</code>
        {" "}
        or
        {" "}
        <code className={"prettyprint"}>cancel-behavior="escape"</code>
        {" "}
        or
        {" "}
        <code className={"prettyprint"}>cancel-behavior="none"</code>
        {" "}
        on the
        {" "}
        <code className={"prettyprint"}>oj-dialog</code>
        {" "}
        element.
      </li>
    </ul>
  </>
);
