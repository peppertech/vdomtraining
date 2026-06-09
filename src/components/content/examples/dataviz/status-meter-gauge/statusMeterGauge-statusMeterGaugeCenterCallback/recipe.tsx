// @ts-nocheck
import { h } from 'preact';

export const statusMeterGaugeStatusMeterGaugeCenterCallbackRecipe = (
  <>
    <ol>
      <li>Create a template element with the slot attribute set to 'centerTemplate'.</li>
      <li>Populate the template element with the desired HTML content.</li>
      <li>
        Template content will have access to a
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojStatusMeterGauge.html#CenterContext"}>CenterContext</a>
        {" "}
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
      <li>
        The HTML element passed in will block interactivity in the center of the gauge by default, but
        the CSS
        {" "}
        <b>pointer-events</b>
        {" "}
        property can be set to 'none' on this element if the gauge's interactivity is desired.
      </li>
    </ol>
  </>
);
