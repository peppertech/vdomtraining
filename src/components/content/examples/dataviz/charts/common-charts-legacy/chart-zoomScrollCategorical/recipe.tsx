// @ts-nocheck
import { h } from 'preact';

export const chartZoomScrollCategoricalRecipe = (
  <>
    <ol>
      <li>
        On the chart, set
        <i><b>zoom-and-scroll</b></i>
        attribute to either
        <i>'live'</i>
        ,
        <i>'liveScrollOnly'</i>
        (to disable zoom), or
        <i>'off'</i>
        (to disable both zoom and scroll). The chart animates continuously while you interact with it,
        so if performance is an issue, use the
        <i>'delayed'</i>
        or
        <i>'delayedScrollOnly'</i>
        mode to turn off the animation.
      </li>
      <li>
        To enable the overview scrollbar, set
        <i><b>overview.rendered</b></i>
        attribute to
        <i>'on'</i>
        . Set the height of the overview scrollbar using
        <i><b>overview.height</b></i>
        attribute. The chart content of the overview scrollbar can be modified using
        <i><b>overview.content</b></i>
        attribute.
      </li>
      <li>
        Set the initial viewport using the
        <i><b>viewportStartGroup</b></i>
        and
        <i><b>viewportEndGroup</b></i>
        properties on the
        <i><b>x-axis</b></i>
        attribute.
      </li>
      <li>
        To enable automatic initial zooming, set
        <i><b>initial-zooming</b></i>
        attribute to
        <i>'first'</i>
        . to initially zoom into the first data points that can fit inside the viewport, or
        <i>'last'</i>
        . to initially zoom into the last data points.
      </li>
      <li>
        To catch and process events triggered when the viewport is changed due to a zoom or scroll
        operation, bind an event listener to the
        <i>ojViewportChange</i>
        event or initialize the component with the
        <i>on-oj-viewport-change</i>
        callback specified (see example). See documentation for more detail.
      </li>
    </ol>
  </>
);
