// @ts-nocheck
import { h } from 'preact';

export const ganttSelectionRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>row-data</b></i>
        {" "}
        attribute. See below for an example.
      </li>
      <li>
        Set the
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        attribute to either
        {" "}
        <i><b>single</b></i>
        {" "}
        or
        {" "}
        <i><b>multiple</b></i>
        {" "}
        to enable selection.
      </li>
      <li>
        Optionally, set the Selection Mode to
        {" "}
        <i><b>multiple</b></i>
        {" "}
        and set Drag Mode to
        {" "}
        <i><b>select</b></i>
        {" "}
        to enable marquee selection of multiple tasks.
      </li>
    </ol>
  </>
);
