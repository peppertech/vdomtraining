// @ts-nocheck
import { h } from 'preact';

export const drawerLayoutCancelableEventsRecipe = (
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
        Add
        {" "}
        <code className={"prettyprint"}>on-oj-before-close</code>
        {" "}
        event handler.
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
        Open drawers using the
        {" "}
        <code className={"prettyprint"}>&lt;edge&gt;-opened</code>
        {" "}
        attribute.
      </li>
      <li>
        Cancel the
        {" "}
        <code className={"prettyprint"}>ojBeforeClose</code>
        {" "}
        event when closing.
      </li>
    </ol>
  </>
);
