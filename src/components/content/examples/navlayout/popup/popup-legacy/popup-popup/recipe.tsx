// @ts-nocheck
import 'preact';

export const popupPopupRecipe = (
  <>
    <ol>
      <li>
        Insert the
        {" "}
        <code className={"prettyprint"}>oj-popup</code>
        {" "}
        element in the view template.
      </li>
      <li>Specify the content to be displayed when the popup is open.</li>
      <li>
        Define an
        {" "}
        <code className={"prettyprint"}>oj-button</code>
        {" "}
        to open the popup when clicked.
      </li>
      <li>
        In the click action handler, call the
        {" "}
        <code className={"prettyprint"}>open()</code>
        {" "}
        method on the popup to open it. Make sure to pass a selector or DOM element reference as the
        required
        {" "}
        <code className={"prettyprint"}>launcher</code>
        {" "}
        argument.
      </li>
    </ol>
  </>
);
