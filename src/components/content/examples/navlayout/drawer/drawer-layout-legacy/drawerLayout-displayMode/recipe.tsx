// @ts-nocheck
import { h } from 'preact';

export const drawerLayoutDisplayModeRecipe = (
  <>
    <ol>
      <li>
        Create a
        <code className={"prettyprint"}>oj-drawer-layout</code>
        element.
      </li>
      <li>
        Create a drawer by adding a child
        <code className={"prettyprint"}>div</code>
        with a
        <code className={"prettyprint"}>slot="end"</code>
        attribute.
      </li>
      <li>
        Control the 'Display mode' with the
        <code className={"prettyprint"}>end-display</code>
        attribute of the layout element.
      </li>
      <li>
        Open or close the drawer using the
        <code className={"prettyprint"}>end-opened</code>
        attribute of the layout element.
      </li>
    </ol>
  </>
);
