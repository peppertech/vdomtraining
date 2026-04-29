// @ts-nocheck
import { h } from 'preact';

export const pictoChartDefaultRecipe = (
  <>
    <ul>
      <li>Create an oj-picto-chart element.</li>
      <li>
        Supply the data items using the
        <i><b>data</b></i>
        attribute.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the the
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        property in
        <b>oj-chart-item</b>
        attribute of
        <b>oj-picto-chart-item</b>
        with meaningful descriptors. Also, when using colors as a data dimension for PictoCharts, the
        application needs to ensure that they meet minimum contrast requirements. Note that not all
        colors in the default value ramp provided by ColorAttributeGroupHandler will meet minimum
        contrast requirements for text.
      </li>
    </ul>
  </>
);
