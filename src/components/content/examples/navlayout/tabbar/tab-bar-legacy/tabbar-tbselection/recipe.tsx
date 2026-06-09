// @ts-nocheck
import { h } from 'preact';

export const tabbarTbselectionRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with the array data.</li>
      <li>Use the oj-tab-bar tag to create a JET Tabbar.</li>
      <li>
        Use the data attribute to bind the ArrayTableDataProvider you created previously as input.
      </li>
      <li>Use the itemTemplate slot to specify the template for rendering the item.</li>
      <li>Ensure that each list item contain an anchor, which in turn contains the list item text.</li>
      <li>If desired, an icon can be added before the list item text as shown.</li>
      <li>
        Bind
        {" "}
        <code className={"prettyprint"}>selection</code>
        {" "}
        to observable to keep track of selected item.
      </li>
      <li>
        If needed, Use
        {" "}
        <code className={"prettyprint"}>on-selection-changed</code>
        {" "}
        callback to perform any action on selection change.
      </li>
    </ol>
    <p>
      Use Tab bar only to toggle between related content sections. To perform any actions on the content
      use
      {" "}
      <a href={"#"}>oj-toolbar</a>
      .
    </p>
  </>
);
