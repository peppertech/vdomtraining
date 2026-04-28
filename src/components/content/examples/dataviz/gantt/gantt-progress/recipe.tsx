// @ts-nocheck
import { h } from 'preact';

export const ganttProgressRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        Supply the data items using the
        <i><b>task-data</b></i>
        attribute. As shown, in order for the progress bars and baseline bars to render, supply the
        <i><b>progress</b></i>
        and
        <i><b>baseline</b></i>
        for each task definition. To show certain task types, supply the
        <i><b>type</b></i>
        for each task definition.
      </li>
      <li>
        Supply the task dependencies information using the
        <i><b>dependency-data</b></i>
        attribute.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the aria-label attribute with meaningful
        description of the Gantt.
      </li>
    </ol>
  </>
);
