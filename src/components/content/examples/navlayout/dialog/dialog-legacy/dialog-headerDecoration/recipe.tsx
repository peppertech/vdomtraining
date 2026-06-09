// @ts-nocheck
import { h } from 'preact';

export const dialogHeaderDecorationRecipe = (
  <>
    <ul>
      <li>
        Use the oj-dialog element to create a
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
        Configure the dialog's header decoration by setting
        {" "}
        <code className={"prettyprint"}>header-decoration='on' or 'off'</code>
        {" "}
        in the
        {" "}
        <code className={"prettyprint"}>oj-radioset</code>
        {" "}
        bindings.
      </li>
      <li>
        Launch the dialog by calling the dialog's
        {" "}
        <code className={"prettyprint"}>open</code>
        {" "}
        method.
      </li>
    </ul>
  </>
);
