// @ts-nocheck
import { h } from 'preact';

export const timelineTooltipDescription = (
  <>
    <p>A timeline is an interactive data visualization that displays a series of events in chronological order.</p><p>
      Note: Inline template is the best practice method to add custom tooltips. You should use renderer
      only for highly customized tooltips.
    </p>
    <p>
      This timeline uses the
      <b><i>tooltip.renderer</i></b>
      function to create a custom tooltip containing a status-meter gauge. Hover over the items (or
      keyboard navigate to, or press and hold on touch devices) to display the custom tooltip. The
      tooltip can also be specified via a template. Please see the
      <a href={"#"}>
        timeline tooltip template demo
      </a>
      for more details.
    </p>
  </>
);
