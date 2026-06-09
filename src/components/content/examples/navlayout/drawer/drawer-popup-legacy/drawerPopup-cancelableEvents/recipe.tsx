// @ts-nocheck
import { h } from 'preact';

export const drawerPopupCancelableEventsRecipe = (
  <>
    <ol>
      <li>
        Create a
        {" "}
        <code className={"prettyprint"}>oj-drawer-popup</code>
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
        Open the drawer using the
        {" "}
        <code className={"prettyprint"}>opened</code>
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
