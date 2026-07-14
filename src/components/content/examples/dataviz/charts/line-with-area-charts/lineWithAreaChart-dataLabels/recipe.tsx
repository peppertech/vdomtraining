import 'preact';

export const lineWithAreaChartDataLabelsRecipe = (
  <>
    <ol>
      <li>
        On the desired data items, specify data labels using the
        {" "}
        <i><b>label</b></i>
        {" "}
        property.
      </li>
      <li>
        To position the data labels, set the
        {" "}
        <i><b>style-defaults.data-label-position</b></i>
        {" "}
        property on the oj-chart element. Alternatively, set the
        {" "}
        <i><b>label-position</b></i>
        {" "}
        attribute on the oj-chart-item element to provide different label positions for each item.
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
    </ol>
  </>
);
