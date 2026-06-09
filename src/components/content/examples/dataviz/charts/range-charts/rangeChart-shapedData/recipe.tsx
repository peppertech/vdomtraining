export const rangeChartShapedDataRecipe = (
  <>
    <ol>
      <li>
        Create an oj-chart element and set
        {" "}
        <i>
          <b>type</b>
          : 'bar'
        </i>
        {" "}
        or
        {" "}
        <i>'area'</i>
        .
      </li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>data</b></i>
        {" "}
        attribute. Each data item should provide a
        {" "}
        <i><b>low</b></i>
        {" "}
        and
        {" "}
        <i><b>high</b></i>
        {" "}
        value to form a range. See this demo for an example.
      </li>
      <li>
        The data supplied to the ArrayDataProvider should be of type
        {" "}
        <a href={"#"}>ojChart.DataItem</a>
        .
      </li>
    </ol>
  </>
);
