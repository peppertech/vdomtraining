// @ts-nocheck
import { h } from 'preact';

export const menuOverviewRecipe = (
  <>
    <ol>
      <li>Create a JET Menu element.</li>
      <li>
        Ensure that each menu item is specified using an
        <code className={"prettyprint"}>oj-option</code>
        element.
      </li>
      <li>An icon can be added before the menu item text.</li>
      <li>
        To handle menu item selection, use an
        <code className={"prettyprint"}>on-oj-menu-action</code>
        listener, not a
        <code className={"prettyprint"}>click</code>
        listener.
      </li>
      <li>To create submenus, add nested oj-menu elements under the desired oj-option elements.</li>
    </ol>
  </>
);
