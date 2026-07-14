// @ts-nocheck
import 'preact';

export const sparkChartDefaultRecipe = (
  <>
    <ol>
      <li>
        Create an oj-spark-chart element with
        {" "}
        <i>
          <b>type</b>
          : 'bar', 'line', 'area'
        </i>
        {" "}
        or
        {" "}
        <i>'lineWithArea'</i>
        .
      </li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>data</b></i>
        {" "}
        attribute.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for providing a meaningful tooltip using
        {" "}
        <i><b>tooltip.renderer</b></i>
        {" "}
        function on the element as the oj-spark-chart element does not provide a default tooltip and
        also ensuring that an accessible label is included that matches the tooltip's content.
      </li>
    </ol>
  </>
);
