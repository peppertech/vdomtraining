// @ts-nocheck
import 'preact';

export const conveyorBeltProgrammaticScrollingRecipe = (
  <>
    <ol>
      <li>
        Please see the
        {" "}
        <a href={"#"}>
          basic conveyor belt demo
        </a>
        {" "}
        for more information about configuring a basic conveyor belt.
      </li>
      <li>
        Please see the
        {" "}
        <a href={"#"}>
          basic tab bar demo
        </a>
        {" "}
        for more information about configuring a basic tab bar.
      </li>
      <li>
        Use
        {" "}
        <code className={"prettyprint"}>oj-tab-bar</code>
        {" "}
        component wrapped inside
        {" "}
        <code className={"prettyprint"}>oj-conveyor-belt</code>
      </li>
      <li>
        Use
        {" "}
        <code className={"prettyprint"}>data</code>
        {" "}
        attribute to bind to a data provider.
      </li>
      <li>
        Use
        {" "}
        <code className={"prettyprint"}>oj-select-single</code>
        {" "}
        component to select a tab in the tabbar
      </li>
      <li>
        Set
        {" "}
        <code className={"prettyprint"}>value</code>
        {" "}
        attribute of the
        {" "}
        <code className={"prettyprint"}>oj-select-single</code>
        {" "}
        and
        {" "}
        <code className={"prettyprint"}>selection</code>
        {" "}
        attribute of the
        {" "}
        <code className={"prettyprint"}>oj-tab-bar</code>
        {" "}
        to
        {" "}
        <code className={"prettyprint"}>selectedItem</code>
      </li>
      <li>
        In
        {" "}
        <code className={"prettyprint"}>oj-tab-bar</code>
        {" "}
        's selection change listener invoke the conveyorBelt's method
        {" "}
        <code className={"prettyprint"}>scrollElementIntoView</code>
      </li>
    </ol>
  </>
);
