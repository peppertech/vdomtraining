// @ts-nocheck
import 'preact';

export const bubbleChartZoomScrollRecipe = (
  <>
    <ol>
      <li>
        On the chart, set
        {" "}
        <i><b>zoom-and-scroll</b></i>
        {" "}
        to either
        {" "}
        <i>'live'</i>
        ,
        <i>'liveScrollOnly'</i>
        {" "}
        (to disable zoom), or
        {" "}
        <i>'off'</i>
        {" "}
        (to disable both zoom and scroll). The chart animates continuously while you interact with it,
        so if performance is an issue, use the
        {" "}
        <i>'delayed'</i>
        {" "}
        or
        {" "}
        <i>'delayedScrollOnly'</i>
        {" "}
        mode to turn off the animation.
      </li>
      <li>
        To specify the direction of zooming, set
        {" "}
        <i><b>zoom-direction</b></i>
        {" "}
        to either
        {" "}
        <i>'auto'</i>
        {" "}
        (for zooming in both directions),
        {" "}
        <i>'x'</i>
        , or
        {" "}
        <i>'y'</i>
        .
      </li>
      <li>
        Set the initial viewport using the
        {" "}
        <i><b>viewportMin</b></i>
        {" "}
        and
        {" "}
        <i><b>viewportMax</b></i>
        {" "}
        properties on the
        {" "}
        <i><b>x-axis</b></i>
        {" "}
        and
        {" "}
        <i><b>y-axis</b></i>
        .
      </li>
      <li>
        To catch and process events triggered when the viewport is changed due to a zoom or scroll
        operation, bind an event listener to the
        {" "}
        <i><b>on-oj-viewport-change</b></i>
        {" "}
        attribute. See documentation for more detail.
      </li>
    </ol>
  </>
);
