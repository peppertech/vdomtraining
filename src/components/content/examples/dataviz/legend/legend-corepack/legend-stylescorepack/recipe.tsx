import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
    <li>
        The item specific stylings can be applied by adding an
        <a target="_blank" href="jsdocs/oj-c.LegendItem.html">oj-c-legend-item</a>
    </li>
    <li>
        Text styling can be customize using
        <b><i>text-style</i></b> and
        <b><i>section-title-style</i></b>
    </li>
    <li>
        Section title horizontal alignment can be set using
        <b><i>section-title-halign</i></b>
    </li>
    <li>
        Symbol size customizations can be set using
        <b><i>symbol-width</i></b> and
        <b><i>symbol-height</i></b>
    </li>
</ol>`;

export const legendStylescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
