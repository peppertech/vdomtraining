// @ts-nocheck
import { h } from 'preact';

export const thematicMapTooltipRecipe = (
  <>
    <ol>
      <li>
        Create a tooltip function that takes a
        {" "}
        <i>dataContext</i>
        {" "}
        argument. The
        {" "}
        <i>dataContext</i>
        {" "}
        contains information on the hovered item, including
        {" "}
        <i>id</i>
        ,
        <i>color</i>
        ,
        <i>label</i>
        , and
        {" "}
        <i>location</i>
        . It also contains the tooltip
        {" "}
        <i>parentElement</i>
        , which the function can modify directly. The function should construct and return the desired
        tooltip string or a DOM element.
      </li>
      <li>
        Set the tooltip function using an expression for the
        {" "}
        <code>tooltip.renderer</code>
        {" "}
        attribute. The tooltip function will be called whenever hovering over the oj-thematic-map
        element to generate the tooltip and append the returned object to itself.
      </li>
      <li>
        If additional data is shown in the tooltip, the application must also override the
        {" "}
        <code>short-desc</code>
        {" "}
        attribute for each data item for markers or areas for accessibility users.
      </li>
    </ol>
  </>
);
