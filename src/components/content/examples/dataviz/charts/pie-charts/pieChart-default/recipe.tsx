// @ts-nocheck
import { h } from 'preact';

export const pieChartDefaultRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        <i>
          <b>type</b>
          : 'pie'
        </i>
        .
      </li>
      <li>
        Supply the data items using the
        <i><b>data</b></i>
        attribute.
      </li>
      <li>
        <b>Accessibility</b>
        : In pie charts, the
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        property in
        <b>oj-chart-item</b>
        is automatically populated with a default descriptor that contains series and value information.
        However it can be explicitly set by the application to provide alternative or more detailed
        information.
      </li>
    </ol>
  </>
);
