// @ts-nocheck
import { h } from 'preact';

export const timelineTooltipTemplateRecipe = (
  <>
    <ol>
      <li>Create a template element with the slot attribute set to 'tooltipTemplate'.</li>
      <li>Populate the template element with the desired HTML content.</li>
      <li>
        Template content will have access to a
        <a target={"_blank"} href={"jsdocs/oj.ojTimeline.html#TooltipContext"}>TooltipContext</a>
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
      <li>
        If additional data is shown in the tooltip, the application must also override the item
        <b><i>shortDesc</i></b>
        for accessibility users.
      </li>
    </ol>
  </>
);
