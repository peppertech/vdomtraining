// @ts-nocheck
import { h } from 'preact';

export const timelineBasicTimelineRecipe = (
  <>
    <ol>
      <li>Create an oj-timeline element with desired attributes specified.</li>
      <li>
        Define the
        {" "}
        <i><b>start</b></i>
        {" "}
        and
        {" "}
        <i><b>end</b></i>
        {" "}
        attribute to indicate the maximal range of the Viewport
      </li>
      <li>
        Define the
        {" "}
        <i><b>viewportStart</b></i>
        {" "}
        and
        {" "}
        <i><b>viewportEnd</b></i>
        {" "}
        attribute to indicate the current viewing range of the Viewport
      </li>
      <li>
        Define the
        {" "}
        <i><b>reference-objects</b></i>
        {" "}
        attribute to render a date indicator. Include information about the reference object in the
        component aria-label for accessibility.
      </li>
      <li>
        Define the
        {" "}
        <i><b>minor-axis</b></i>
        {" "}
        and
        {" "}
        <i><b>major-axis</b></i>
        {" "}
        scale property to adjust the viewport time scale. Note: Using a timescale that is too narrow may
        prevent the Timeline from rendering
      </li>
      <li>
        If desired, define
        {" "}
        <i><b>selection</b></i>
        {" "}
        and
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        to have one or more events selected.
      </li>
      <li>
        The
        {" "}
        <i><b>orientation</b></i>
        {" "}
        mode can be changed to "vertical" to use the vertical Timeline (default "horizontal").
      </li>
      <li>
        The
        {" "}
        <i><b>overview.rendered</b></i>
        {" "}
        can be changed to "on" to enable the overview with the Timeline.
      </li>
    </ol>
  </>
);
