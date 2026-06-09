// @ts-nocheck
import { h } from 'preact';

export const sunburstExpandRecipe = (
  <>
    <ol>
      <li>Create an oj-sunburst element.</li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>data</b></i>
        {" "}
        attribute.
      </li>
      <li>
        Set the
        {" "}
        <i><b>node-defaults.show-disclosure</b></i>
        {" "}
        attribute to "on" to display the expand/collapse button on each node.
      </li>
      <li>
        The
        {" "}
        <i><b>expanded</b></i>
        {" "}
        attribute is a
        {" "}
        <i>KeySet</i>
        {" "}
        instance which is an
        {" "}
        <i>AllKeySetImpl</i>
        {" "}
        by default, meaning that all nodes will be expanded. If desired, set the
        {" "}
        <i><b>expanded</b></i>
        {" "}
        attribute to be an
        {" "}
        <i>KeySetImpl</i>
        {" "}
        and add the ids of the nodes to be expanded on render.
      </li>
      <li>
        Add an event listener to the on-expanded-changed attribute to track changes to the expanded
        state.
      </li>
    </ol>
  </>
);
