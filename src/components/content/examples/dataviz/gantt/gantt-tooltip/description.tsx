// @ts-nocheck
import { h } from 'preact';

export const ganttTooltipDescription = (
  <>
    <p>A gantt displays scheduling information graphically, making it easier to plan, coordinate, and track various tasks and resources.</p><p>
      There are two ways to create custom tooltips: by using the
      <b><i>tooltipTemplate</i></b>
      slot, or by supplying a
      <b><i>tooltip.renderer</i></b>
      function. The former enables straightforward templating, whereas the latter offers more
      flexibility in generating custom content via JavaScript.
    </p>

    <p>
      This demo shows how to use the
      <b><i>tooltip.renderer</i></b>
      function to create custom tooltips. Hover over (or keyboard navigate to, or press and hold on
      touch devices) the tasks to display the custom tooltip. The
      <a href={"#"}>
        gantt template demo
      </a>
      shows how to achieve something similar using templates instead.
    </p>
  </>
);
