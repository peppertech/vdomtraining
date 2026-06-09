// @ts-nocheck
import { h } from 'preact';

export const timelineCustomScaleTimelineRecipe = (
  <>
    <ol>
      <li>Create an oj-timeline element with desired attributes specified.</li>
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
        <i><b>minor-axis.zoom-order</b></i>
        {" "}
        array. This demo shows custom 3 hours and 6 hours timescales in the minor axis.
      </li>
    </ol>
  </>
);
