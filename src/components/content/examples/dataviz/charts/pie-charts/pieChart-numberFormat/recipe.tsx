// @ts-nocheck
import { h } from 'preact';

export const pieChartNumberFormatRecipe = (
  <>
    <ol>
      <li>
        To format tooltip values, create a converter and set it on the chart's
        {" "}
        <i><b>value-formats.value</b></i>
        {" "}
        object.
      </li>
      <li>
        To have the same format for your data labels, use the same converter in your oj-chart-item to
        format the data label.
      </li>
    </ol>
  </>
);
