// @ts-nocheck
import { h } from 'preact';

export const ganttCustomBarsRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        Supply the data using the
        <i><b>task-data</b></i>
        attribute. See this demo for an example.
      </li>
      <li>
        Specify row heights using
        <i><b>row-defaults.height</b></i>
        to middle align the tasks within the rows.
      </li>
      <li>
        Specify
        <i><b>task-defaults.overlap.behavior</b></i>
        and
        <i><b>task-defaults.overlap.behavior</b></i>
        to define the layout of chronologically overlapping tasks globally.
      </li>
      <li>
        For each task data definition, specify the
        <i><b>overlap.behavior</b></i>
        to define overlap behavior at a per task basis.
      </li>
      <li>
        For each task data definition, specify the
        <i><b>height</b></i>
        to define custom heights.
      </li>
      <li>
        For each task data definition, specify the
        <i><b>svg-class-name</b></i>
        to customize the tasks using CSS.
      </li>
    </ol>
  </>
);
