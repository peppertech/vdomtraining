// @ts-nocheck
import { h } from 'preact';

export const ganttDrillRecipe = (
  <>
    <ol>
      <li>
        Create an
        <code>ArrayDataProvider</code>
        from an array of data, or a JSON source, for the
        <b><i>row-data</i></b>
        attribute.
      </li>
      <li>
        To map specific task properties, add a task mapping template with
        <b><i>oj-gantt-task</i></b>
        as a child element. See the
        <a target={"_blank"} href={"jsdocs/oj.ojGanttTask.html"}>oj-gantt-task</a>
        doc for more information. Also add a row mapping template with
        <b><i>oj-gantt-row</i></b>
        as a child element to map specific gantt row properties. See the
        <a target={"_blank"} href={"jsdocs/oj.ojGanttRow.html"}>oj-gantt-row</a>
        doc for more information.
      </li>
      <li>
        Set
        <b><i>row-axis.rendered</i></b>
        to "on" to show row labels. Also optionally set a width on the row axis to fix the width.
      </li>
      <li>
        Create a template element with the slot attribute set to 'rowAxisLabelTemplate'. If not
        provided, and a custom renderer is also not provided through
        <i><b>row-axis.label.renderer</b></i>
        , then a default label using the label supplied by the data is rendered.
      </li>
      <li>Populate the template element with the desired SVG content.</li>
      <li>
        Template content will have access to a
        <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#RowAxisLabelRendererContext"}>
          RowAxisLabelRendererContext
        </a>
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
      <li>
        Attach on-click listener to the row label and the handler should render the gantt with the
        updated task list based on the label.
      </li>
      <li>
        Attach key-down listener to the root element and check for the selected attribute of the gantt.
        Identify the label the task belongs to and render the gantt with the corresponding data.
      </li>
    </ol>
  </>
);
