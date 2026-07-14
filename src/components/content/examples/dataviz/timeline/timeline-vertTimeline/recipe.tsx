// @ts-nocheck
import 'preact';

export const timelineVertTimelineRecipe = (
  <>
    <ol>
      <li>
        Use
        {" "}
        <i><b>orientation</b></i>
        {" "}
        attribute equals to 'vertical' to trigger it on timeline.
      </li>
      <li>
        Set
        {" "}
        <i><b>start</b></i>
        {" "}
        and
        {" "}
        <i><b>end</b></i>
        {" "}
        attributes for each series item to define it's duration.
      </li>
      <li>
        Set data item's
        {" "}
        <i><b>durationFillColor</b></i>
        {" "}
        property for custom color if required
      </li>
      <li>
        Define the
        {" "}
        <i><b>reference-objects</b></i>
        {" "}
        attribute to render a date indicator. Include information about the reference object in the
        component aria-label for accessibility.
      </li>
    </ol>
  </>
);
