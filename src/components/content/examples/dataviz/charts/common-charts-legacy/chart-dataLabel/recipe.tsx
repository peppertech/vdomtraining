// @ts-nocheck
import 'preact';

export const chartDataLabelRecipe = (
  <>
    <ol>
      <li>
        Create a data label function that takes a
        {" "}
        <i>dataContext</i>
        {" "}
        argument. The
        {" "}
        <i>dataContext</i>
        {" "}
        contains information on the data item, including
        {" "}
        <i>id</i>
        ,
        <i>series</i>
        ,
        <i>group</i>
        ,
        <i>value</i>
        ,
        <i>data</i>
        ,
        <i>seriesData</i>
        ,
        <i>groupData</i>
        {" "}
        and
        {" "}
        <i>component</i>
        . The function should return the desired data label string or number. If a number is returned,
        it will be formatted using the chart's
        {" "}
        <b><i>value-formats.label</i></b>
        {" "}
        attribute before being used as a label.
      </li>
      <li>
        Pass the function to the chart
        {" "}
        <b><i>data-label</i></b>
        {" "}
        attribute. The chart will then call the function when constructing the label of the data items.
      </li>
    </ol>
  </>
);
