// @ts-nocheck
import { h } from 'preact';

export const ganttDependenciesRecipe = (
  <>
    <ol>
      <li>Create an oj-gantt element.</li>
      <li>
        Supply the data using the
        {" "}
        <i><b>row-data</b></i>
        {" "}
        attribute. See this demo for an example.
      </li>
      <li>
        Supply the dependencies information using the
        {" "}
        <i><b>dependency-data</b></i>
        {" "}
        attribute.
      </li>
      <li>
        Use
        {" "}
        <i><b>svgStyle</b></i>
        {" "}
        and
        {" "}
        <i><b>svgClassName</b></i>
        {" "}
        to customize the style of the dependency line including using custom connector with custom SVG
        markers.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the aria-label attribute with meaningful
        description of the Gantt.
      </li>
    </ol>
  </>
);
