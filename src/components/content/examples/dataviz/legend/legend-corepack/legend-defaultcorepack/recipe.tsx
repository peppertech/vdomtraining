import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an &lt;oj-c-legend&gt; element and set the
    <i><b>orientation</b></i>
    attribute to either
    <i>'vertical'</i>
    or
    <i>'horizontal'</i>
    .
  </li>
  <li>
    Supply the items for the legend using the
    <i><b>data</b></i>
    attribute.
  </li>
  <li>
    Add an
    <b>itemTemplate</b>
    slot with
    <b>oj-c-legend-item</b>
    child element. For more details, see
    <a target="_blank" href="jsdocs/oj-c.Legend.html#itemTemplate">itemTemplate</a>
    and
    <a target="_blank" href="jsdocs/oj-c.LegendItem.html">oj-c-legend-item</a>
    .
  </li>
  <li>
    <b>Accessibility</b> : To make your component accessible, set the appropriate aria props. See this <a target="_blank" href="jsdocs/oj-c.Legend.html#a11y-section">doc</a> for details. When setting color, applications are responsible for making sure that the color meets the 
    <a href="https://www.w3.org/TR/WCAG21/#non-text-contrast">minimum contrast ratio</a>
    .
  </li>
</ol>`;

export const legendDefaultcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
