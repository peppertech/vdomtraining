import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    On the desired data items, specify data labels using the
    <i><b>label</b></i>
    property.
  </li>
  <li>
    To position the data labels, set the
    <i><b>style-defaults.data-label-position</b></i>
    property on the oj-c-line-chart element.
  </li>
  <li>
    To apply custom CSS styling to data labels, set the
    <i><b>style-defaults.data-label-style</b></i>
    attribute.
  </li>
</ol>`;

export const lineChartDataLabelscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
