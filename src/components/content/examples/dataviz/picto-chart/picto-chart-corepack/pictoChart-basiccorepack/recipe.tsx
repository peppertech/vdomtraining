// @ts-nocheck
import 'preact';

const recipeHtmlText = String.raw`<ul>
    <li>Create an oj-c-picto-chart element.</li>
    <li>
      Supply the data items using the
      <i><b>data</b></i>
      attribute.
    </li>
    <li>
      <b>Accessibility</b>: The application is responsible for populating the
      <i><b>short-desc</b></i>
      attribute of
      <b>oj-c-picto-chart-item</b>
      with meaningful descriptors. Also, when using colors as a data dimension for picto charts, the
      application needs to ensure that they meet minimum contrast requirements. Note that not all
      colors in the default value ramp provided by ColorAttributeGroupHandler will meet minimum
      contrast requirements for text.
    </li>
  </ul>`;

export const pictoChartBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
