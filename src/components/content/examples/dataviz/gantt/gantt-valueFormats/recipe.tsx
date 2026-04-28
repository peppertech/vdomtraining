// @ts-nocheck
import { h } from 'preact';

export const ganttValueFormatsRecipe = (
  <>
    <ol>
      <li>
        To format the tooltip labels, create a value format object
        <i>
          {'{'}
          <b>type</b>
          : &lt; yourType &gt;,
          <b>tooltipLabel</b>
          : &lt; yourTooltipLabel &gt;{'}'}
        </i>
        and push it to the valueFormats array. See the
        <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#valueFormats"}>API doc</a>
        for more details.
      </li>
      <li>
        A custom converter object can optionally be included in the value format object to format values
        displayed in the tooltip.
      </li>
      <li>
        To set whether or not a value is displayed in the tooltip, set the
        <i><b>tooltipDisplay</b></i>
        on the value format object to
        <i>'auto'</i>
        or
        <i>'off'</i>
        .
      </li>
      <li>
        If additional data is shown in the tooltip, the application must also override the task
        <b><i>shortDesc</i></b>
        for accessibility users.
      </li>
    </ol>
  </>
);
