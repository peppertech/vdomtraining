import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Set
    <i><b>hide-and-show-behavior</b></i>
    as either
    <i>'none'</i>,
    <i>'withRescale'</i>, or
    <i>'withoutRescale'</i>.
  </li>
  <li>
    Initially hide a series by adding the series category to the
    <i><b>hidden-categories</b></i>
    array.
  </li>
  <li>
    To catch and process events triggered when a category of data items is hidden or shown, bind an
    event listener using the
    <i><b>on-hidden-categories-changed</b></i>
    attribute. See documentation for more detail.
  </li>
</ol>`;

export const areaChartHideShowcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
