// @ts-nocheck
import 'preact';

export const dialogResizeBehaviorRecipe = (
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
        Configure the dialog's resize behavior by setting
        {" "}
        <code className={"prettyprint"}>resize-behavior: "resizable" or "none"</code>
        {" "}
        in the oj-dialog element.
      </li>
    </ul>
  </>
);
