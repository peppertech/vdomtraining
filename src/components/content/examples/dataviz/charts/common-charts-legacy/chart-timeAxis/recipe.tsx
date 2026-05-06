// @ts-nocheck
import { h } from 'preact';

export const chartTimeAxisRecipe = (
  <>
    <p>
      For
      <b>regular</b>
      time axis:
    </p>
    <ol>
      <li>
        On the chart, set
        <b><i>time-axis-type</i></b>
        to
        <i>'enabled'</i>
        or
        <i>'skipGaps'</i>
        .
      </li>
      <li>
        Supply the array of time values to the
        <b><i>group-id</i></b>
        attribute of your
        <b>oj-chart-item</b>
        . The time should be specified as an ISO string.
      </li>
      <li>
        Chart expects ordered time data when
        <b><i>time-axis-type</i></b>
        is set to 'enabled' or 'skipGaps'. If your time values may not be in chronological order, assign
        a comparator to
        <b><i>group-comparator</i></b>
        to sort the groups in chronological order.
      </li>
    </ol>

    <p>
      For
      <b>mixed frequency</b>
      time axis:
    </p>
    <ol>
      <li>
        On the chart, set
        <b><i>time-axis-type</i></b>
        to
        <i>'mixedFrequency'</i>
        .
      </li>
      <li>
        Supply the time values to the
        <b><i>x</i></b>
        attribute of each data item. The time should be specified as an ISO string.
      </li>
    </ol>
  </>
);
