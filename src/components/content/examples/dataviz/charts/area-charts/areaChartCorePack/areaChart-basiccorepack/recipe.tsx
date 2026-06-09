import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an oj-c-area-chart element.
  </li>
  <li>
    Supply the data items using the
    <i><b>data</b></i>
    attribute.
  </li>
  <li>
    Make the chart grow horizontally with
    <i>
      <b>orientation</b>: 'horizontal'
    </i>
    attribute.
  </li>
  <li>
    Stack the data items with
    <i>
      <b>stack</b>: 'on'
    </i>
    attribute.
  </li>
  <li>
    <b>Accessibility</b>: The
    <a target="_blank" href="jsdocs/oj-c.AreaChartItem.html#shortDesc">
      <i><b>short-desc</b></i>
    </a> property in oj-c-area-chart-item
    is automatically populated with a default descriptor that contains series, group, and value information of each
    item. However,
    it can be explicitely set by the application to provide alternative or more detailed information.
  </li>
</ol>`;

export const areaChartBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
