// @ts-nocheck
import 'preact';

export const pieChartDataLabelsRecipe = (
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
        To position the data labels, set
        {" "}
        <i><b>label-position</b></i>
        {" "}
        attribute on
        {" "}
        <b><i>oj-chart-item</i></b>
        . Alternatively, apply data label positioning to all data items at once by setting the
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
    </ol>
  </>
);
