// @ts-nocheck
import 'preact';

export const ganttCustomScalesRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>task-data</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To show custom scales in the time axis, supply custom instances of DvtTimeComponentScale to the
        {" "}
        <i><b>major-axis.scale</b></i>
        {" "}
        and/or
        {" "}
        <i><b>minor-axis.scale</b></i>
        {" "}
        attributes. The same instances can also be supplied as part of the
        {" "}
        <i><b>major-axis.zoom-order</b></i>
        {" "}
        and/or
        {" "}
        <i><b>minor-axis.zoom-order</b></i>
        {" "}
        array. This demo shows custom 3 hours and 6 hours timescales.
      </li>
    </ol>
  </>
);
