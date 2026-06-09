// @ts-nocheck
import { h } from 'preact';

export const chartTooltipTemplateRecipe = (
  <>
    <ol>
      <li>Create a template element with the slot attribute set to 'tooltipTemplate'.</li>
      <li>Populate the template element with the desired HTML content.</li>
      <li>
        Template content will have access to a
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#TooltipContext"}>TooltipContext</a>
        {" "}
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
    </ol>
  </>
);
