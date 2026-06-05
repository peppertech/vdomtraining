// @ts-nocheck
import { h } from 'preact';

export const dialogModalRecipe = (
  <>
    <ul>
      <li>
        Use the
        <code className={"prettyprint"}>oj-dialog</code>
        custom element to create a
        <code className={"prettyprint"}>dialog</code>
        component.
      </li>
      <li>
        Define the dialog body content:
        <br />
        Create a child element with
        <code className={"prettyprint"}>slot='body'</code>
        , and define your body content within this element.
      </li>
      <li>
        Define the dialog footer content:
        <ul>
          <li>
            Create a child element with
            <code className={"prettyprint"}>slot='footer'</code>
            and define your footer content within this element.
          </li>
          <li>
            Define buttons with actions within the footer: In this demo, clicking on the "OK" button
            will close the dialog. This is implemented by calling
            <code className={"prettyprint"}>dialog.close()</code>
            within the button's click handler.
          </li>
        </ul>
      </li>
      <li>
        Use the optional
        <code className={"prettyprint"}>aria-describedby</code>
        attribute to specify content that should be read by screen readers as the dialog description.
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
        By default the dialog modality is set to
        <code className={"prettyprint"}>modality="modal"</code>
        in the oj-dialog.
      </li>
    </ul>
  </>
);
