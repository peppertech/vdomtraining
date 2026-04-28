import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Set line-type of oj-c-area-chart-series to
    <i>'straight'</i>
    or
    <i>'curved'</i>
    .
  </li>
</ol>`;

export const areaChartLineTypescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
