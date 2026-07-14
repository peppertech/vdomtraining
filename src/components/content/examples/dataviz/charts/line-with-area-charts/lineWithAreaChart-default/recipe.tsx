import 'preact';

export const lineWithAreaChartDefaultRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        {" "}
        <i>
          <b>type</b>
          : 'line-with-area'
        </i>
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
        Make the chart grow horizontally with
        {" "}
        <i>
          <b>orientation</b>
          : 'horizontal'
        </i>
        {" "}
        attribute.
      </li>
      <li>
        Stack the data items with
        {" "}
        <i>
          <b>stack</b>
          : 'on'
        </i>
        {" "}
        attribute.
      </li>
      <li>Transparency of an area can be varied by setting the series color with an rgba color.</li>
      <li>
        <b>Accessibility</b>
        : In line with area charts, the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChartItem.html#shortDesc"}>
          <i><b>short-desc</b></i>
        </a>
        {" "}
        property in
        {" "}
        <b>oj-chart-item</b>
        {" "}
        is automatically populated with a default descriptor that contains series, group, and value
        information. However it can be explicitly set by the application to provide alternative or more
        detailed information.
      </li>
    </ol>
  </>
);
