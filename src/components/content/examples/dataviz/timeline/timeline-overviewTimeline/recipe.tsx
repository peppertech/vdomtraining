// @ts-nocheck
import { h } from 'preact';

export const timelineOverviewTimelineRecipe = (
  <>
    <ol>
      <li>Create an oj-timeline element with desired attributes specified.</li>
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
        In the dataset, specify each event's
        {" "}
        <i><b>series</b></i>
        {" "}
        attribute based on which series it should appear in.
      </li>
      <li>
        Set the
        {" "}
        <i><b>orientation</b></i>
        {" "}
        attribute as "horizontal" (default) or "vertical"
      </li>
      <li>
        Set the
        {" "}
        <i><b>overview.rendered</b></i>
        {" "}
        attribute as "off" (default) or "on"
      </li>
    </ol>
  </>
);
