// @ts-nocheck
import 'preact';

export const tabbarTbbadgeRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with the array data.</li>
      <li>Use the oj-tab-bar tag to create a JET Tabbar.</li>
      <li>
        Use the data attribute to bind the ArrayTableDataProvider you created previously as input.
      </li>
      <li>Use the itemTemplate slot to specify the template for rendering the item.</li>
      <li>
        Ensure that
        {" "}
        <code className={"prettyprint"}>edge</code>
        {" "}
        attribute set to
        {" "}
        <code className={"prettyprint"}>top</code>
        {" "}
        for the default view
      </li>
      <li>
        Ensure that
        {" "}
        <code className={"prettyprint"}>oj-sm-condense</code>
        {" "}
        is added on root node to condense items in tabbar.
      </li>
      <li>
        To add badge/metadata/icon to tabbar item, add this style class to your span
        {" "}
        <code className={"prettyprint"}>oj-tabbar-item-end</code>
      </li>
      <li>
        If desired, icons-only list can be shown by setting
        {" "}
        <code className={"prettyprint"}>display</code>
        {" "}
        attribute to
        {" "}
        <code className={"prettyprint"}>icons</code>
      </li>
      <li>
        If desired, icon and label can be stacked by setting
        {" "}
        <code className={"prettyprint"}>display</code>
        {" "}
        attribute to
        {" "}
        <code className={"prettyprint"}>stacked</code>
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
