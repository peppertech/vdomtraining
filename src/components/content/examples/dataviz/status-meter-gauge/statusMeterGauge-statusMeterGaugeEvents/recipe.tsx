// @ts-nocheck
import { h } from 'preact';

export const statusMeterGaugeStatusMeterGaugeEventsRecipe = (
  <>
    <ol>
      <li>
        Create a status meter gauge by using the oj-status-meter-gauge tag with the
        {" "}
        <i><b>value</b></i>
        {" "}
        attribute defined.
      </li>
      <li>
        To catch and process events triggered when the
        {" "}
        <i><b>value</b></i>
        {" "}
        is changed, bind an event listener using the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojStatusMeterGauge.html#value"}>
          <i><b>on-value-changed</b></i>
        </a>
        {" "}
        attribute.
      </li>
      <li>
        To retrieve the
        {" "}
        <i>transient-value</i>
        {" "}
        of the gauge during hover action, read the
        {" "}
        <code>transientValue</code>
        {" "}
        property of the gauge. See
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojStatusMeterGauge.html#transientValue"}>
          <i>transientValue</i>
        </a>
        {" "}
        for more detail.
      </li>
    </ol>
  </>
);
