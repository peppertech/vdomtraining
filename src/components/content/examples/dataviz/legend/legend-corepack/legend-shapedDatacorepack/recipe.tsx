import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Specify a DataProvider (items only) or a TreeDataProvider (sections and items) using the
    <i><b>data</b></i>
    attribute.
  </li>
  <li>
    The data supplied to the DataProvider should be of shape modeled in the demo.ts of this demo. To see the full list of supported apis in items see
    <a target="_blank" href="jsdocs/oj-c.LegendItem.html">oj-c-legend-item</a> and for section see
    <a target="_blank" href="jsdocs/oj-c.LegendSection.html">oj-c-legend-section</a>.
  </li>
</ol>`;

export const legendShapedDatacorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
