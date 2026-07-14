// @ts-nocheck
import 'preact';

export const drawerLayoutBasicRecipe = (
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
        Open or close the drawer using the
        {" "}
        <code className={"prettyprint"}>start-opened</code>
        {" "}
        attribute of the layout element.
      </li>
    </ol>
  </>
);
