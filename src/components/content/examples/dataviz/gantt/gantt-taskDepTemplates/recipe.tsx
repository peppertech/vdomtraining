// @ts-nocheck
import { h } from 'preact';

export const ganttTaskDepTemplatesRecipe = (
  <>
    <ol>
      <li>
        To customize content inside the taskbar:
        <ol>
          <li>
            Create a template element with the slot attribute set to
            {" "}
            <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#taskContentTemplate"}>taskContentTemplate</a>
            .
          </li>
          <li>
            Template content will have access to a binding
            {" "}
            <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#TaskContentTemplateContext"}>context</a>
            {" "}
            via the $current property as well as via any data-oj-as alias provided on the template
            element. The binding context's data comes from the
            {" "}
            <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#rowData"}>row-data</a>
            {" "}
            data provider.
          </li>
          <li>Populate the template element with the desired SVG content.</li>
        </ol>
      </li>
      <li>
        To customize dependency lines:
        <ol>
          <li>
            Create a template element with the slot attribute set to
            {" "}
            <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#dependencyContentTemplate"}>
              dependencyContentTemplate
            </a>
            .
          </li>
          <li>
            Template content will have access to a binding
            {" "}
            <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#DependencyContentTemplateContext"}>
              context
            </a>
            {" "}
            via the $current property as well as via any data-oj-as alias provided on the template
            element. The binding context's data comes from the
            {" "}
            <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#dependencyData"}>dependency-data</a>
            {" "}
            data provider.
          </li>
          <li>Populate the template element with the desired SVG content.</li>
        </ol>
      </li>
      <li>
        <b>Accessibility</b>
        : The application should specify meaningful information in the task's
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojGanttTask.html#shortDesc"}>short-desc</a>
        {" "}
        and dependency's
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojGanttDependency.html#shortDesc"}>short-desc</a>
        {" "}
        attributes to convey information about the custom content. This demo shows an example custom
        task tooltip and custom task short-desc that gets read out by screen readers.
      </li>
    </ol>
  </>
);
