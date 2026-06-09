// @ts-nocheck
import { h } from 'preact';

export const ganttHierarchicalTasksRecipe = (
  <>
    <ol>
      <li>
        Create an
        {" "}
        <code>ArrayTreeDataProvider</code>
        {" "}
        from an array of data, or a JSON source, for the
        {" "}
        <b><i>row-data</i></b>
        {" "}
        attribute. The data should convey hierarchical task relationships.
      </li>
      <li>
        To map specific task properties, add a task mapping template with
        {" "}
        <b><i>oj-gantt-task</i></b>
        {" "}
        as a child element. See the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojGanttTask.html"}>oj-gantt-task</a>
        {" "}
        doc for more information. As shown, in order for the progress bars and baseline bars to render,
        supply the progress and baseline for each task definition. To show certain task types, supply
        the type for each task definition.
      </li>
      <li>
        Add a row mapping template with
        {" "}
        <b><i>oj-gantt-row</i></b>
        {" "}
        as a child element to map specific gantt row properties. See the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojGanttRow.html"}>oj-gantt-row</a>
        {" "}
        doc for more information.
      </li>
      <li>
        Set
        {" "}
        <b><i>row-axis.rendered</i></b>
        {" "}
        to "on" to show row labels and the expand/collapse icons.
      </li>
      <li>
        Set
        {" "}
        <b><i>parent-row-position</i></b>
        {" "}
        to "sticky" to fix top-level parent rows to the top of the Gantt as the user scrolls. Note that
        if any dependency lines are present in the Gantt, this will take on the "static" behavior, and
        no rows will remain sticky. In this demo, dependency lines are removed when "sticky" behavior is
        selected.
      </li>
      <li>
        Use the
        {" "}
        <b><i>expanded</i></b>
        {" "}
        attribute to specify which tasks to expand.
      </li>
      <li>
        Create an
        {" "}
        <code>ArrayDataProvider</code>
        {" "}
        from an array of data, or a JSON source, for the
        {" "}
        <b><i>dependency-data</i></b>
        {" "}
        attribute. Each data row should contain data for a single gantt dependency line.
      </li>
      <li>
        To map specific dependency line properties, add a dependency template with
        {" "}
        <b><i>oj-gantt-dependency</i></b>
        {" "}
        as a child element. See the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojGanttDependency.html"}>oj-gantt-dependency</a>
        {" "}
        doc for more information.
      </li>
    </ol>
  </>
);
