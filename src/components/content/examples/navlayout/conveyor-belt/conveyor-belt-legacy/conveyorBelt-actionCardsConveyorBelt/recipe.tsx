// @ts-nocheck
import 'preact';

export const conveyorBeltActionCardsConveyorBeltRecipe = (
  <>
    <ol>
      <li>
        Create an
        {" "}
        <a href={"jsdocs/oj.ojActionCard.html"}><code className={"prettyprint"}>oj-action-card</code></a>
        {" "}
        element
      </li>
      <li>
        Wrap the child elements in an
        {" "}
        <code className={"prettyprint"}>oj-conveyor-belt.</code>
        {" "}
        Use
        {" "}
        <code className={"prettyprint"}>oj-bind-for-each</code>
        {" "}
        to bind items of an array to the specified markup section.
      </li>
      <li>
        Restrict the width of the
        {" "}
        <code className={"prettyprint"}>oj-conveyor-belt</code>
        {" "}
        element as needed, beyond which overflow will be managed by the ConveyorBelt.
      </li>
    </ol>
  </>
);
