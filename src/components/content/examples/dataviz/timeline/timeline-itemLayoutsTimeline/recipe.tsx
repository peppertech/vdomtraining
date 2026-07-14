// @ts-nocheck
import 'preact';

export const timelineItemLayoutsTimelineRecipe = (
  <>
    <ol>
      <li>Create an oj-timeline element with desired attributes specified.</li>
      <li>
        Define the
        {" "}
        <i><b>reference-objects</b></i>
        {" "}
        attribute to render a date indicator. Include information about the reference object in the
        component aria-label for accessibility.
      </li>
      <li>
        Specify the desired
        {" "}
        <i><b>itemLayout</b></i>
        {" "}
        property in the series to configure its layout direction.
      </li>
    </ol>
  </>
);
