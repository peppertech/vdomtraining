// @ts-nocheck
import { h } from 'preact';

export const tabbarTbbasicRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with the array data.</li>
      <li>Use the oj-tab-bar tag to create a JET Tabbar.</li>
      <li>
        Use the data attribute to bind the ArrayTableDataProvider you created previously as input.
      </li>
      <li>Use the itemTemplate slot to specify the template for rendering the item.</li>
      <li>Ensure that each list item contain an anchor, which in turn contains the list item text.</li>
      <li>Ensure that an icon is added before the list item text as shown.</li>
      <li>
        To handle item selection, bind
        {" "}
        <code className={"prettyprint"}>selection</code>
        {" "}
        attribute to an observable as shown.
      </li>
      <li>
        To display only Icons set
        {" "}
        <code className={"prettyprint"}>display</code>
        {" "}
        attribute to
        {" "}
        <code className={"prettyprint"}>icons</code>
        .
      </li>
      <li>
        Dark background: if you want to put a component on a dark background you can put it in a
        container with a class like
        {" "}
        <a href={"#"}>
          <code className={"prettyprint"}>oj-bg-neutral-170</code>
        </a>
        . Whenever you use a dark background you also need to add
        {" "}
        <a href={"jsdocs/ContrastingBackgroundColor.html#oj-color-invert"}>
          <code className={"prettyprint"}>oj-color-invert</code>
        </a>
        {" "}
        to tell components within to invert their colors.
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
