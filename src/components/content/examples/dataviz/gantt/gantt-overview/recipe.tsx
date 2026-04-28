// @ts-nocheck
import { h } from 'preact';

export const ganttOverviewRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        <b>Accessibility:</b>
        The application is responsible for populating the aria-label attribute with meaningful
        description of the Gantt, as well as utilizing the short-desc APIs to supply meaningful row and
        task information.
      </li>
      <li>
        Supply the data items using the
        <i><b>row-data</b></i>
        and
        <i><b>dependency-data</b></i>
        attributes. See this demo for an example.
      </li>
      <li>
        To perform data property mapping, create template elements, each with their slot attribute set
        to
        <i><b>rowMappingTemplate</b></i>
        ,
        <i><b>taskMappingTemplate</b></i>
        , or
        <i><b>dependencyTemplate</b></i>
        . Each should contain a single oj-gantt-row, oj-gantt-task, or oj-gantt-dependency element
        respectively. They will respectively have access to a
        <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#RowMappingTemplateContext"}>
          RowMappingTemplateContext
        </a>
        ,
        <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#TaskMappingTemplateContext"}>
          TaskMappingTemplateContext
        </a>
        , or
        <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#DependencyTemplateContext"}>
          DependencyTemplateContext
        </a>
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
      <li>
        Set the
        <i><b>time-cursor</b></i>
        attribute to
        <i><b>on</b></i>
        or
        <i><b>off</b></i>
        to enable or disable the time cursor.
      </li>
      <li>
        Set the
        <i><b>zooming</b></i>
        attribute to
        <i><b>on</b></i>
        or
        <i><b>off</b></i>
        to enable or disable zoom.
      </li>
      <li>
        Set the
        <i><b>selection-behavior</b></i>
        attribute to
        <i><b>highlightDependencies</b></i>
        to enable highlighting relevant dependencies upon task selection.
      </li>
      <li>
        Set the
        <i><b>task-aggregation</b></i>
        attribute to
        <i><b>on</b></i>
        to show chronologically adjacent tasks as horizontally stacked.
      </li>
      <li>
        Set the
        <i><b>dnd.move.tasks</b></i>
        and
        <i><b>task-defaults.resizable</b></i>
        attributes to enable task move and resize.
      </li>
      <li>
        Create a template element with the slot attribute set to
        <i><b>rowAxisLabelTemplate</b></i>
        . If not provided, and a custom renderer is also not provided through
        <i><b>row-axis.label.renderer</b></i>
        , then a default label using the label supplied by the data is rendered. Populate the template
        element with the desired SVG content. Template content will have access to a
        <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#RowAxisLabelRendererContext"}>
          RowAxisLabelRendererContext
        </a>
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
      <li>
        Define the
        <i><b>reference-objects</b></i>
        attribute to render reference lines. It's recommended to include information about the reference
        object in the component aria-label for accessibility.
      </li>
      <li>
        To show custom scales in the time axis, supply custom instances of DvtTimeComponentScale to the
        <i><b>major-axis.scale</b></i>
        and/or
        <i><b>minor-axis.scale</b></i>
        attributes. The same instances can also be supplied as part of the
        <i><b>major-axis.zoom-order</b></i>
        and/or
        <i><b>minor-axis.zoom-order</b></i>
        array. This demo shows a custom 8-hour timescale in the minor-axis.
      </li>
    </ol>
  </>
);
