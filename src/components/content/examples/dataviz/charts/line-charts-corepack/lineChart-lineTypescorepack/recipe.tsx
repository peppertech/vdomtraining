import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Set line-type of oj-c-line-chart-series to
    <i>'straight'</i>
    or
    <i>'curved'</i>.
  </li>
</ol>`;

export const lineChartLineTypescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
