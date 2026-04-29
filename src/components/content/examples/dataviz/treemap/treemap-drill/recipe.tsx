// @ts-nocheck
import { h } from 'preact';

export const treemapDrillRecipe = (
  <>
    <ol>
      <li>Create an oj-treemap tag.</li>
      <li>
        Supply the data items using the
        <i><b>data</b></i>
        attribute.
      </li>
      <li>
        Set the
        <i><b>drilling</b></i>
        attribute to "on" to enable drilling and define the
        <i><b>display-levels</b></i>
        attribute if desired.
      </li>
      <li>
        A drill gesture will trigger a
        <i>ojBeforeDrill</i>
        event which can be used to veto the drill action by returning false in the
        <i>ojBeforeDrill</i>
        listener callback function.
      </li>
      <li>
        If the
        <i>ojBeforeDrill</i>
        event doesn't veto the drill action then the
        <i><b>root-node</b></i>
        attribute is updated with the drilled node and a drill event is triggered.
      </li>
      <li>
        This demo shows how to append new data every time drilling is initiated. This technique improves
        the performance of the treemap and allows for extremely large datasets to be explored.
      </li>
      <li>
        It is useful to define the displayLevels when appending additional data. This is to ensure when
        a user navigates back to the initial root using the breadcrumbs, they would see only the levels
        of data that they saw on the initial render.
      </li>
      <li>
        For smaller data sets, you can load all the data up front which gives the user the ability to
        see the full set of data while still allowing for drilling to view subtrees.
      </li>
    </ol>
  </>
);
