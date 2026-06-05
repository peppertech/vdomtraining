// @ts-nocheck
import { h } from 'preact';

export const dialogNestedRecipe = (
  <>
    <ul>
      <li>
        Use the oj-dialog element to create a
        <code className={"prettyprint"}>dialog</code>
        component.
      </li>
      <li>
        Create a child element with with
        <code className={"prettyprint"}>slot='body'</code>
        , and define your body content within this element.
      </li>
      <li>
        Configure how to launch the dialog:
        <ul>
          <li>
            Configure with the dialog component to be initially invisible, using the
            <code className={"prettyprint"}>initial-visibility="hide"</code>
            attribute.
          </li>
          <li>
            Call the dialog's
            <code className={"prettyprint"}>open</code>
            method to open the dialog.
          </li>
        </ul>
      </li>
      <li>
        Use the oj-dialog element to create a nested
        <code className={"prettyprint"}>dialog</code>
        component.
      </li>
      <li>
        Define a way to launch the nested dialog from within the main dialog.
        <br />
        In this demo, we have defined a button within the main dialog that will launch the nested
        dialog.
      </li>
    </ul>
  </>
);
