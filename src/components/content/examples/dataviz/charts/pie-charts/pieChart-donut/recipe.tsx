// @ts-nocheck
import 'preact';

export const pieChartDonutRecipe = (
  <>
    <ol>
      <li>
        Set the chart's
        {" "}
        <b><i>style-defaults.pie-inner-radius</i></b>
        {" "}
        attribute to a number from 0 to 1, representing the fraction of the pie's radius that is
        transparent to make a donut chart.
      </li>
      <li>
        To add a center label, you can set a
        {" "}
        <i><b>pie-center.label</b></i>
        {" "}
        value to the string you want. To apply custom CSS styling to the center label, set the
        {" "}
        <i><b>pie-center.label-style</b></i>
        {" "}
        attribute.
      </li>
    </ol>
  </>
);
