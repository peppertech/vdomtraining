// @ts-nocheck
import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Set
    <i><b>layout</b></i>
    to either
    <i>'horizontal'</i>
    (default) or
    <i>'vertical'</i>.
  </li>
  <li>
    Set
    <i><b>layout-origin</b></i>
    to either
    <i>'topStart'</i>
    (default),
    <i>'topEnd'</i>,
    <i>'bottomStart'</i>
    or
    <i>'bottomEnd'</i>.
  </li>
</ol>`;

export const pictoChartLayoutcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
