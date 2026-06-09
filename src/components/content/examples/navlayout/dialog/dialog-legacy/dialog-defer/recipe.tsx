// @ts-nocheck
import { h } from 'preact';

export const dialogDeferRecipe = (
  <>
    <ul>
      <li>
        Use the
        {" "}
        <code className={"prettyprint"}>oj-dialog</code>
        {" "}
        element to create a
        {" "}
        <code className={"prettyprint"}>dialog</code>
        {" "}
        component.
      </li>
      <li>
        Create a child element with
        {" "}
        <code className={"prettyprint"}>slot='body'</code>
        , and define your body content within this element.
      </li>
      <li>
        Use the
        {" "}
        <code className={"prettyprint"}>oj-defer</code>
        {" "}
        tag to define deferred content inside the
        {" "}
        <code className={"prettyprint"}>slot='body'</code>
        .
      </li>
    </ul>
  </>
);
