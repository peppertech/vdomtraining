// @ts-nocheck
import { h } from 'preact';

export const filePickerCaptureRecipe = (
  <>
    <ul>
      <li>
        Create an
        {" "}
        <code className={"prettyprint"}>oj-file-picker</code>
        {" "}
        element, specifying 'user', 'environment', or 'implementation' for the
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#capture"}>capture</a>
        {" "}
        attribute.
      </li>
      <li>
        Specify ["image/*"] (or ["video/*"]) for the
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#accept"}>accept</a>
        {" "}
        attribute.
      </li>
      <li>
        Add an
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#event:select"}>ojSelect</a>
        {" "}
        event listener to the
        {" "}
        <code className={"prettyprint"}>oj-file-picker</code>
        {" "}
        element using the on-oj-select attribute. In the listener, update the current selected file
        names.
      </li>
    </ul>
  </>
);
