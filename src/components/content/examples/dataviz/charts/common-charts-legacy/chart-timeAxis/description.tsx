// @ts-nocheck
import { h } from 'preact';

export const chartTimeAxisDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>JET charts support three kinds of time axis:</p>
    <ul>
      <li>
        When
        {" "}
        <b><i>time-axis-type</i></b>
        {" "}
        is set to
        {" "}
        <b>enabled</b>
        {" "}
        or
        {" "}
        <b>skipGaps</b>
        , the group of each data item is determined by its time value, which is passed through
        {" "}
        <i>group-id</i>
        {" "}
        attribute of the
        {" "}
        <i>oj-chart-item</i>
        ; hence, the data items within each group should share the same time value. The time intervals
        between groups do
        {" "}
        <i>not</i>
        {" "}
        have to be uniform; however, if the time axis type is
        {" "}
        <b>skipGaps</b>
        , the times always will be drawn uniformly ignoring the gaps. Stacking is possible in these two
        modes.
      </li>
      <li>
        When
        {" "}
        <b><i>time-axis-type</i></b>
        {" "}
        is set to
        {" "}
        <b>mixedFrequency</b>
        , the group of data item is passed through
        {" "}
        <i>group-id</i>
        {" "}
        attribute, while the time value is passed through
        {" "}
        <i>x</i>
        {" "}
        attribute of the
        {" "}
        <i>oj-chart-item</i>
        . This allows data items from a same group to have a different time value. Since the time value
        of the data items within each group can vary, stacking is
        {" "}
        <i>not</i>
        {" "}
        possible.
      </li>
    </ul>
  </>
);
