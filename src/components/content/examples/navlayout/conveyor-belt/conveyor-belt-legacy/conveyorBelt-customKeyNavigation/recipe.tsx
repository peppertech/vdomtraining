// @ts-nocheck
import { h } from 'preact';

export const conveyorBeltCustomKeyNavigationRecipe = (
  <>
    HTML Markup:
    <ol>
      <li>
        Please see the
        {" "}
        <a href={"#"}>
          basic conveyor belt demo
        </a>
        {" "}
        for more information about configuring a basic ConveyorBelt.
      </li>
      <li>
        Specify
        {" "}
        <code className={"prettyprint"}>tabindex="0"</code>
        {" "}
        on an ancestor container element of the items in the conveyor belt so that it can receive focus
        and keyboard events.
      </li>
      <li>
        Listen for keyboard events on the ancestor container element of the items in the ConveyorBelt.
      </li>
    </ol>
    Script:
    <ol>
      <li>
        In the keyboard listener, call the DOM function
        {" "}
        <code className={"prettyprint"}>scrollIntoView()</code>
        {" "}
        on the desired item in the ConveyorBelt.
      </li>
    </ol>
  </>
);
