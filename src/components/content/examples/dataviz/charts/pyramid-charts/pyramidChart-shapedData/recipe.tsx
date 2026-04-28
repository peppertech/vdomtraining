export const pyramidChartShapedDataRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        <i>
          <b>type</b>
          : 'pyramid'
        </i>
        .
      </li>
      <li>
        Supply the data items using the
        <i><b>data</b></i>
        attribute.
      </li>
      <li>
        The data supplied to the ArrayDataProvider should be of type
        <a href={"#"}>ojChart.DataItem</a>
        .
      </li>
      <li>
        <b>Accessibility</b>
        : In pyramid charts, the
        <a href={"#"}>
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
