// @ts-nocheck
import 'preact';

export const chartNumberFormatRecipe = (
  <>
    <ol>
      <li>
        To format the axis tick labels, create a JET converter and pass it to
        {" "}
        <i><b>x/y/y2-axis.tick-label.converter</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To format numerical data labels or the tooltip values, create a converter and set it on the
        chart's
        {" "}
        <i><b>value-formats</b></i>
        {" "}
        attribute.
      </li>
      <li>
        Chart's built-in labeling logic automatically calculates the number of fractional digits to
        display based on the data. When specifying external converters, it may be desirable to leverage
        this calculation in the converter configuration. To incorporate chart's default fractional digit
        settings into your converter, use
        {" "}
        <i>
          <a target={"_blank"} href={"jsdocs/ojchart-utils.html#getLabelFormatInfo"}>getLabelFormatInfo</a>
        </i>
        {" "}
        to compute values for the minimum and maximum number of fractional digits
      </li>
    </ol>
  </>
);
