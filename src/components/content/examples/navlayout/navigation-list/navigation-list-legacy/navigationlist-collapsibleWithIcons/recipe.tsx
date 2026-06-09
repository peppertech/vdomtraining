// @ts-nocheck
import { h } from 'preact';

export const navigationlistCollapsibleWithIconsRecipe = (
  <>
    <ol>
      <li>
        Create a JET Navigation List by wrapping an unordered list with &lt;oj-navigation-list&gt;.
      </li>
      <li>Ensure that each list item contain an anchor, which in turn contains the list item text.</li>
      <li>Ensure that an icon is added before the list item text as shown.</li>
      <li>
        Ensure that
        {" "}
        <code className={"prettyprint"}>drill-mode</code>
        {" "}
        attribute set to
        {" "}
        <code className={"prettyprint"}>collapsible</code>
      </li>
      <li>
        To handle item selection, bind
        {" "}
        <code className={"prettyprint"}>selection</code>
        {" "}
        attribute to an observable as shown.
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
  </>
);
