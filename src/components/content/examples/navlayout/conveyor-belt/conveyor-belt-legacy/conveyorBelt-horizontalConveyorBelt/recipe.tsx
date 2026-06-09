// @ts-nocheck
import { h } from 'preact';

export const conveyorBeltHorizontalConveyorBeltRecipe = (
  <>
    <ol>
      <li>In the HTML, specify a group of sibling elements to be managed by the ConveyorBelt.</li>
      <li>
        Wrap the child elements in an
        {" "}
        <code className={"prettyprint"}>oj-conveyor-belt.</code>
      </li>
      <li>
        Restrict the width of the
        {" "}
        <code className={"prettyprint"}>oj-conveyor-belt</code>
        {" "}
        element as needed, beyond which overflow will be managed by the ConveyorBelt. This demo uses
        responsive grid style classes for the purpose of illustrating use of the ConveyorBelt.
      </li>
      <li>
        Set the data-oj-binding-provider attribute to 'none' to notify the framework that particular
        elements or subtrees have no knockout dependencies and can be initialized without a knockout
        applyBindings call. For more information, see
        {" "}
        <a href={"jsdocs/CustomElementOverview.html#ce-overview-upgrade-section"}>
          Upgrading a Custom Element
        </a>
        .
      </li>
    </ol>
  </>
);
