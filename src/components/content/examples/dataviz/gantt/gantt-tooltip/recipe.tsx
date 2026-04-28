// @ts-nocheck
import { h } from 'preact';

export const ganttTooltipRecipe = (
  <>
    <ol>
      <li>
        Create a tooltip function that takes a
        <i>dataContext</i>
        argument. The
        <i>dataContext</i>
        contains information on the hovered task, including task
        <i>data</i>
        ,
        <i>rowData</i>
        ,
        <i>color</i>
        and
        <i>component</i>
        . It also contains the tooltip
        <i>parentElement</i>
        , which the function can modify directly. The function should construct and return the desired
        tooltip string or a DOM element. If the function returns null, the tooltip won't be displayed.
      </li>
      <li>
        Pass the function to the gantt
        <b><i>tooltip.renderer</i></b>
        attribute. The gantt will then call the function on hover to generate the tooltip and append the
        returned object to itself.
      </li>
      <li>
        If additional data is shown in the tooltip, the application must also override the task
        <b><i>shortDesc</i></b>
        for accessibility users.
      </li>
    </ol>
  </>
);
