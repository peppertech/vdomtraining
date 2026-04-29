// @ts-nocheck
import { h } from 'preact';

export const treemapTooltipRecipe = (
  <>
    <ol>
      <li>
        Create a tooltip function that takes a
        <i>dataContext</i>
        argument. The
        <i>dataContext</i>
        contains information on the hovered item, including
        <i>id</i>
        ,
        <i>color</i>
        ,
        <i>label</i>
        ,
        <i>value</i>
        , and
        <i>radius</i>
        . It also contains the tooltip
        <i>parentElement</i>
        , which the function can modify directly. The function should construct and return the desired
        tooltip string or a DOM element.
      </li>
      <li>
        Pass the function to the treemap
        <b><i>tooltip.renderer</i></b>
        attribute. The treemap will then call the function on hover to generate the tooltip and append
        the returned object to itself.
      </li>
      <li>
        If additional data is shown in the tooltip, the application must also override the node
        <b><i>short-desc</i></b>
        for accessibility users.
      </li>
    </ol>
  </>
);
