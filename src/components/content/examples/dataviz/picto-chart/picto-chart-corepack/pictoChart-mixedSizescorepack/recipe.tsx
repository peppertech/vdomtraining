// @ts-nocheck
import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Set the
    <i><b>row-span</b></i>
    attribute of
    <b>oj-c-picto-chart-item</b>
    to the desired number.
  </li>
  <li>
    Set the
    <i><b>column-span</b></i>
    attribute of
    <b>oj-c-picto-chart-item</b>
    to desired number.
  </li>
</ol>`;

export const pictoChartMixedSizescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
