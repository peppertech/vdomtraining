import 'preact';

export const ganttDrillTimeAxisRecipe = (
  <ol>
    <li>Create an oj-gantt element.</li>
    <li>
      Supply the data items using the <i><b>row-data</b></i> attribute.
    </li>
    <li>
      Set the <i><b>row-axis.rendered</b></i> attribute to <i><b>on</b></i> to show row labels.
    </li>
    <li>
      Define the <i><b>reference-objects</b></i> attribute to render reference lines and areas.
      Optionally use the utility function TimeUtils.getWeekendReferenceObjects() to construct a set
      of weekend reference areas.
    </li>
    <li>
      Set the <i><b>minor-axis.drillable</b></i> to <i><b>on</b></i> to enable minor axis label
      drilling.
    </li>
    <li>
      Set the <i><b>major-axis.drillable</b></i> to <i><b>on</b></i> to enable major axis label
      drilling.
    </li>
    <li>
      Only visible time axis labels can be drilled on. Set the <i><b>viewport-start</b></i> and{' '}
      <i><b>viewport-end</b></i> appropriately to yield a sufficiently wide viewport to ensure
      labels are visible.
    </li>
    <li>
      Provide an <i><b>on-oj-minor-axis-drill</b></i> handler to handle the minor axis label drill.
    </li>
    <li>
      Provide an <i><b>on-oj-major-axis-drill</b></i> handler to handle the major axis label drill.
    </li>
    <li>
      <b>Accessibility:</b> If minor axis and/or major axis drilling is enabled, the application
      should ensure that the effect of the drill is communicated to the user by the screen reader.
      A best practice is to update a live region upon drill so that the screen reader announces this
      information. This demo shows a live region that is updated in the{' '}
      <i><b>on-oj-minor-axis-drill</b></i> and <i><b>on-oj-major-axis-drill</b></i> handlers.
    </li>
  </ol>
);
