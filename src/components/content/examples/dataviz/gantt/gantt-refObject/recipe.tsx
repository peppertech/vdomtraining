// @ts-nocheck
import { h } from 'preact';

export const ganttRefObjectRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        Supply the data items using the
        <i><b>task-data</b></i>
        attribute. See this demo for an example.
      </li>
      <li>
        Define the
        <i><b>reference-objects</b></i>
        attribute to render reference lines and areas. Optionally use the utility function
        TimeUtils.getWeekendReferenceObjects() to construct a set of weekend reference areas.
      </li>
      <li>
        Include information about the reference object in the component aria-label for accessibility.
      </li>
    </ol>
  </>
);
