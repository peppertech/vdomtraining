// @ts-nocheck
import 'preact';

export const dialogModelessRecipe = (
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
        Use the optional
        {" "}
        <code className={"prettyprint"}>aria-describedby</code>
        {" "}
        attribute to specify content that should be read by screen readers as the dialog description.
      </li>
      <li>
        Configure how to launch the dialog:
        <ul>
          <li>
            Call the dialog's
            {" "}
            <code className={"prettyprint"}>open</code>
            {" "}
            method to open the dialog.
          </li>
        </ul>
      </li>
      <li>
        Configure the dialog to modeless by setting
        {" "}
        <code className={"prettyprint"}>modality="modeless"</code>
        {" "}
        in the oj-dialog.
      </li>
    </ul>
  </>
);
