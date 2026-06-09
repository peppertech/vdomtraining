// @ts-nocheck
import { h } from 'preact';

export const drawerLayoutMultipleDrawersRecipe = (
  <>
    <ol>
      <li>
        Create a
        {" "}
        <code className={"prettyprint"}>oj-drawer-layout</code>
        {" "}
        element.
      </li>
      <li>
        Create a drawer by adding a child
        {" "}
        <code className={"prettyprint"}>div</code>
        {" "}
        with a
        {" "}
        <code className={"prettyprint"}>slot="start"</code>
        {" "}
        attribute.
      </li>
      <li>
        Create a drawer by adding a child
        {" "}
        <code className={"prettyprint"}>div</code>
        {" "}
        with a
        {" "}
        <code className={"prettyprint"}>slot="end"</code>
        {" "}
        attribute.
      </li>
      <li>
        Create a drawer by adding a child
        {" "}
        <code className={"prettyprint"}>div</code>
        {" "}
        with a
        {" "}
        <code className={"prettyprint"}>slot="bottom"</code>
        {" "}
        attribute.
      </li>
      <li>
        Open or close the drawers using the
        {" "}
        <code className={"prettyprint"}>start-opened</code>
        {" "}
        and
        {" "}
        <code className={"prettyprint"}>end-opened</code>
        {" "}
        attributes.
      </li>
    </ol>
  </>
);
