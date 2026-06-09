// @ts-nocheck
import { h } from 'preact';

export const scatterChartDataLabelsRecipe = (
  <>
    <ol>
      <li>
        On the desired data items, specify data labels using the
        {" "}
        <i><b>label</b></i>
        {" "}
        attribute.
      </li>
      <li>
        Apply data label positioning to all data items at once by setting the
        {" "}
        <i><b>style-defaults.data-label-position</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To fit the data label within the chart's bounds, set the
        {" "}
        <i><b>style-defaults.data-label-collision</b></i>
        {" "}
        attribute to
        {" "}
        <i>'fitInBounds'</i>
        .
      </li>
      <li>
        To format numerical data labels, create a converter and set it on the chart's
        {" "}
        <i><b>value-formats</b></i>
        {" "}
        object.
      </li>
      <li>
        To reposition the data label in order to reduce the overlapping labels, set the
        {" "}
        <i><b>style-defaults.resolve-label-overlap</b></i>
        {" "}
        to
        {" "}
        <i>'on'</i>
        .
      </li>
      <li>
        To hide the overlapping labels, set the
        {" "}
        <i><b>style-defaults.hide-overlapping-labels</b></i>
        {" "}
        to
        {" "}
        <i>'on'</i>
        .
      </li>
      <li>
        If the application does not want to show information in the datatip labels, set the
        {" "}
        <i><b>value-formats.label.tooltip-display</b></i>
        {" "}
        to
        {" "}
        <i>'off'</i>
        .
      </li>
      <li>
        This is not currently shown in the demo,but to apply custom CSS styling to data labels, set the
        {" "}
        <i><b>style-defaults.data-label-style</b></i>
        {" "}
        attribute.
      </li>
    </ol>
  </>
);
