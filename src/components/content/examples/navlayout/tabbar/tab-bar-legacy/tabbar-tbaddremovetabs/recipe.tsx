// @ts-nocheck
import { h } from 'preact';

export const tabbarTbaddremovetabsRecipe = (
  <>
    <ol>
      <li>
        Use
        <code className={"prettyprint"}>data</code>
        attribute to bind to a data provider.
      </li>
      <li>
        Ensure that
        <code className={"prettyprint"}>oj-removable</code>
        class is added to item(s) that needs to be removed as shown in the template.
      </li>
      <li>Append new item in to data array when user add a tab.</li>
      <li>
        Remove item from the data array when remove event fired. It is recommended to update a live
        region upon removal of a tab so that the screen reader announces this information. This demo
        shows a live region that is updated in the
        <i><b>on-oj-remove</b></i>
        handler.
      </li>
      <li>
        Information about Dark background can be found in the
        <a href={"jsdocs/ContrastingBackgroundColor.html"}>styling doc</a>
        .
      </li>
    </ol>
    <p>
      Use Tab bar only to toggle between related content sections. To perform any actions on the content
      use
      <a href={"#"}>oj-toolbar</a>
      .
    </p>
  </>
);
