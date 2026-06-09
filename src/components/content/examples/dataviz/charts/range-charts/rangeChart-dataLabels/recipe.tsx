export const rangeChartDataLabelsRecipe = (
  <>
    <ol>
      <li>
        On the desired data items, specify data labels using the
        {" "}
        <i><b>label</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To position the data labels, set
        {" "}
        <i><b>label-position</b></i>
        {" "}
        on the data item. Alternatively, apply data label positioning to all data items at once by
        setting the
        {" "}
        <i><b>style-defaults.data-label-position</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To apply custom CSS styling to data labels, set the
        {" "}
        <i><b>style-defaults.data-label-style</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To format numerical data labels, create a converter and set it on the chart's
        {" "}
        <i><b>value-formats</b></i>
        {" "}
        object.
      </li>
      <li>
        For range charts, the
        {" "}
        <i><b>label</b></i>
        ,
        <i><b>label-position</b></i>
        , and
        {" "}
        <i><b>label-style</b></i>
        {" "}
        attributes can take an array of two values. If an array is provided, the first and second values
        apply to the low and high labels respectively.
      </li>
    </ol>
  </>
);
