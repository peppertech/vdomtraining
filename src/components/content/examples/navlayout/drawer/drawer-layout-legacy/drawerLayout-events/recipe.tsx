// @ts-nocheck
import 'preact';

export const drawerLayoutEventsRecipe = (
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
        Add
        {" "}
        <code className={"prettyprint"}>on-oj-start-opened-changed</code>
        {" "}
        and
        {" "}
        <code className={"prettyprint"}>on-oj-end-opened-changed</code>
        {" "}
        writeback handlers.
      </li>
      <li>
        Add
        {" "}
        <code className={"prettyprint"}>on-oj-before-close</code>
        {" "}
        handler.
      </li>
      <li>
        Open or close the drawers with
        {" "}
        <code className={"prettyprint"}>start-opened</code>
        {" "}
        and
        {" "}
        <code className={"prettyprint"}>end-opened</code>
        {" "}
        attributes of the drawer layout.
      </li>
    </ol>
  </>
);
