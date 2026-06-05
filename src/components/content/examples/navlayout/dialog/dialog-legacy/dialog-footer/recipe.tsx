// @ts-nocheck
import { h } from 'preact';

export const dialogFooterRecipe = (
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
            Call the dialog's
            <code className={"prettyprint"}>open</code>
            method to open the dialog.
          </li>
        </ul>
      </li>
      <li>
        Define the dialog footer content and footer separator.
        <br />
        Create a child element with
        <code className={"prettyprint"}>slot='body'</code>
        and the
        <code className={"prettyprint"}>oj-dialog-footer-separator</code>
        class. Then define your footer content within this element.
      </li>
    </ul>
  </>
);
