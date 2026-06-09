// @ts-nocheck
import { h } from 'preact';

export const ganttTaskManipulateRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        Set the
        {" "}
        <b>dnd.move.tasks</b>
        {" "}
        attribute to "enabled" to enable task move. Similarly, set the
        {" "}
        <b>task-defaults.resizable</b>
        {" "}
        attribute to "enabled" to enable task resize.
      </li>
      <li>
        If moving or resizing multiple selected tasks at the same time is desired, set
        {" "}
        <b>selection-mode</b>
        {" "}
        to "multiple". If marquee selection is desired, set
        {" "}
        <b>drag-mode</b>
        {" "}
        to "select".
      </li>
      <li>
        Upon moving of task(s), an ojMove event is fired. Specify an ojMove listener to handle the move
        as desired, e.g. via the DOM attribute
        {" "}
        <b>on-oj-move</b>
        {" "}
        as shown. Similarly, upon resize of task(s), an ojResize event is fired. Specify an ojResize
        listener to handle the resize as desired, e.g. via the DOM attribute
        {" "}
        <b>on-oj-resize</b>
        {" "}
        as shown.
      </li>
    </ol>
  </>
);
