// @ts-nocheck
import { h } from 'preact';

export const filePickerCustomTextRecipe = (
  <>
    <ul>
      <li>
        Create an
        {" "}
        <code className={"prettyprint"}>oj-file-picker</code>
        {" "}
        element, specify attributes
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#primaryText"}>primary-text</a>
        {" "}
        or
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#secondaryText"}>secondary-text</a>
        {" "}
        to customize the text content. Both attributes can take either a string or a formatting function
        that returns a string.
      </li>
      <li>
        In this demo,
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#primaryText"}>primary-text</a>
        {" "}
        is configured with a simple string value while
        {" "}
        <a href={"jsdocs/oj.ojFilePicker.html#secondaryText"}>secondary-text</a>
        {" "}
        is configured with a function to vary the text based on the oj-file-picker selection-mode.
      </li>
    </ul>
  </>
);
