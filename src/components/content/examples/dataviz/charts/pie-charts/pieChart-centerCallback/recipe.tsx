// @ts-nocheck
import 'preact';

export const pieChartCenterCallbackRecipe = (
  <>
    <ol>
      <li>Create a template element with the slot attribute set to 'pieCenterTemplate'.</li>
      <li>Populate the template element with the desired HTML content.</li>
      <li>
        Template content will have access to a
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#PieCenterContext"}>PieCenterContext</a>
        {" "}
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
      <li>
        The HTML element passed in will block interactivity in the center of the chart by default, but
        the CSS
        {" "}
        <b>pointer-events</b>
        {" "}
        property can be set to 'none' on this element if the pie chart's interactivity is desired.
      </li>
    </ol>
  </>
);
