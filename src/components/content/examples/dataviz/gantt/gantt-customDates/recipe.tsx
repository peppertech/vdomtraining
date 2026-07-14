// @ts-nocheck
import 'preact';

export const ganttCustomDatesRecipe = (
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
        array. This demo shows a custom 4-4-5 weeks calendar.
      </li>
      <li>
        Supply a scale specific converter to the
        {" "}
        <i><b>major-axis.converter</b></i>
        {" "}
        and
        {" "}
        <i><b>minor-axis.converter</b></i>
        {" "}
        attributes to customize axis labels for non-custom scales. In this demo, custom converters for
        the major axis’s weeks scale and minor axis’s days scale were used to customize the time axis
        labels.
      </li>
    </ol>
  </>
);
