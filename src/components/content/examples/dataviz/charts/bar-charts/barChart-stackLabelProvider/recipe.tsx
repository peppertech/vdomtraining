// @ts-nocheck
import { h } from 'preact';

export const barChartStackLabelProviderRecipe = (
  <>
    <ol>
      <li>
        Create a data label function that takes an argument of type
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#DataLabelContext"}>DataLabelContext</a>
        . This function should return the desired data label for the specified chart item. If a number
        is returned, it will be formatted using the chart's value-formats.label attribute.
      </li>
      <li>
        Pass the function to the chart
        {" "}
        <b><i>data-label</i></b>
        {" "}
        attribute. The chart will then call the function when constructing the label of the data items.
      </li>
      <li>
        Create a stack label function that takes an argument of type
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#StackLabelContext"}>StackLabelContext</a>
        . This function should return the desired data label for the specified stacked bar. If a number
        is returned, it will be formatted using the chart's value-formats.label attribute.
      </li>
      <li>
        Pass the function to the chart
        {" "}
        <b><i>stack-label-provider</i></b>
        {" "}
        attribute. The chart will then call the function when constructing the bar chart's stack label.
      </li>
    </ol>
  </>
);
