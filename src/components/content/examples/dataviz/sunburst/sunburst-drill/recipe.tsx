// @ts-nocheck
import { h } from 'preact';

export const sunburstDrillRecipe = (
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
        <i><b>drilling</b></i>
        {" "}
        attribute to "on" to enable drilling and define the
        {" "}
        <i><b>display-levels</b></i>
        {" "}
        attribute if desired.
      </li>
      <li>
        A drill gesture will trigger an
        {" "}
        <i>ojBeforeDrill</i>
        {" "}
        event which can be used to veto the drill action by returning false in the
        {" "}
        <i>ojBeforeDrill</i>
        {" "}
        listener callback function.
      </li>
      <li>
        If the
        {" "}
        <i>ojBeforeDrill</i>
        {" "}
        event doesn't veto the drill action then the
        {" "}
        <i><b>root-node</b></i>
        {" "}
        attribute is updated with the drilled node and a drill event is triggered.
      </li>
      <li>
        This demo has all of the data loaded up front meaning that all of the data levels can be
        displayed at once. However for large datasets it is advisable to only load a subset of the data
        and to then fetch additional data when drilling is initiated. This improves the performance of
        the sunburst and allows for extremely large datasets to be explored.
      </li>
    </ol>
  </>
);
