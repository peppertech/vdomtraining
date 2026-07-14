// @ts-nocheck
import 'preact';

export const ganttAnimationsRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>row-data</b></i>
        {" "}
        attribute.
      </li>
      <li>
        Set
        {" "}
        <i><b>animation-on-display</b></i>
        {" "}
        to
        {" "}
        <i>'auto'</i>
        {" "}
        to enable initial display animation.
      </li>
      <li>
        Set
        {" "}
        <i><b>animation-on-data-change</b></i>
        {" "}
        to
        {" "}
        <i>'auto'</i>
        {" "}
        to enable data change animation.
      </li>
      <li>
        Subsequent data changes will induce animations, as shown by the button actions in this demo.
      </li>
    </ol>
  </>
);
