// @ts-nocheck
import { h } from 'preact';

export const filePickerButtonRecipe = (
  <>
    <ul>
      <li>
        Create an
        <code className={"prettyprint"}>oj-button</code>
        element.
      </li>
      <li>
        In the button's
        <a href={"jsdocs/oj.ojButton.html#event:action"}>ojAction</a>
        event listener, call the
        <a href={"jsdocs/ojfilepickerutils.html#pickFiles"}>pickFiles</a>
        method from the ojfilepickerutils module. Pass in a callback that will be called when a file is
        selected as well as a
        <a href={"jsdocs/ojfilepickerutils.html#FileOptions"}>FileOptions</a>
        object to configure file selection properties like accept, capture, and selection mode.
      </li>
    </ul>
  </>
);
