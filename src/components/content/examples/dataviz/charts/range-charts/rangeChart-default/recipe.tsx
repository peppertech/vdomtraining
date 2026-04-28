export const rangeChartDefaultRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        <i>
          <b>type</b>
          : 'bar'
        </i>
        or
        <i>'area'</i>
        .
      </li>
      <li>
        Supply the data items using the
        <i><b>data</b></i>
        attribute. Each data item should provide a
        <i><b>low</b></i>
        and
        <i><b>high</b></i>
        value to form a range.
      </li>
      <li>
        Make the chart grow horizontally with
        <i>
          <b>orientation</b>
          : 'horizontal'
        </i>
        attribute.
      </li>
      <li>
        <b>Accessibility</b>
        : In range charts, the
        <a href={"#"}>
          <i><b>short-desc</b></i>
        </a>
        property in
        <b>oj-chart-item</b>
        is automatically populated with a default descriptor that contains series, group, and value
        information. However it can be explicitly set by the application to provide alternative or more
        detailed information.
      </li>
    </ol>
  </>
);
