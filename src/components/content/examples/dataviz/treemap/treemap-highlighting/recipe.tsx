// @ts-nocheck
import { h } from 'preact';

export const treemapHighlightingRecipe = (
  <>
    <ol>
      <li>Create an oj-treemap element.</li>
      <li>
        Set the
        {" "}
        <a href={"jsdocs/oj.ojTreemap.html#hoverBehavior"}>hover-behavior</a>
        {" "}
        attribute to
        {" "}
        <i>'dim'</i>
        {" "}
        to enable highlighting.
      </li>
      <li>
        Set the
        {" "}
        <a href={"jsdocs/oj.ojTreemap.html#highlightMode"}>highlight-mode</a>
        {" "}
        attribute to
        {" "}
        <i>'categories'</i>
        {" "}
        to highlight all objects that belong to the same category as hovered item.
      </li>
      <li>
        Set the
        {" "}
        <a href={"jsdocs/oj.ojTreemap.html#highlightMode"}>highlight-mode</a>
        {" "}
        attribute to
        {" "}
        <i>'descendants'</i>
        {" "}
        to highlight all objects that are descendants of the hovered item.
      </li>
    </ol>
  </>
);
