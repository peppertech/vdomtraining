// @ts-nocheck
import 'preact';

export const ganttMultipleTasksRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>row-data</b></i>
        {" "}
        attribute. See this demo for an example.
      </li>
      <li>
        Set the
        {" "}
        <i><b>row-axis.rendered</b></i>
        {" "}
        attribute to
        {" "}
        <i><b>on</b></i>
        {" "}
        to show row labels.
      </li>
      <li>
        Create a template element with the slot attribute set to 'rowAxisLabelTemplate'. If not
        provided, and a custom renderer is also not provided through
        {" "}
        <i><b>row-axis.label.renderer</b></i>
        , then a default label using the label supplied by the data is rendered.
      </li>
      <li>Populate the template element with the desired SVG content.</li>
      <li>
        Template content will have access to a
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojGantt.RowAxisLabelRendererContext"}>
          RowAxisLabelRendererContext
        </a>
        {" "}
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
      <li>
        Define the
        {" "}
        <i><b>reference-objects</b></i>
        {" "}
        attribute to render reference lines and areas. Optionally use the utility function
        TimeUtils.getWeekendReferenceObjects() to construct a set of weekend reference areas.
      </li>
      <li>
        Include information about the reference object in the component aria-label for accessibility.
      </li>
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
        <i><b>major-axis.zoom-order</b></i>
        {" "}
        and/or
        {" "}
        <i><b>minor-axis.zoom-order</b></i>
        {" "}
        array. This demo shows a custom 8-hour timescale.
      </li>
    </ol>
  </>
);
