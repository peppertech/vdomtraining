// @ts-nocheck
import 'preact';

export const drawerPopupEventsRecipe = (
  <>
    <ol>
      <li>
        Create
        {" "}
        <code className={"prettyprint"}>oj-drawer-popup</code>
        {" "}
        elements.
      </li>
      <li>
        Add
        {" "}
        <code className={"prettyprint"}>on-oj-opened-changed</code>
        {" "}
        writeback handlers.
      </li>
      <li>
        Add
        {" "}
        <code className={"prettyprint"}>on-oj-before-close</code>
        {" "}
        handlers.
      </li>
      <li>
        Open or close drawers using the
        {" "}
        <code className={"prettyprint"}>opened</code>
        {" "}
        attributes.
      </li>
    </ol>
  </>
);
