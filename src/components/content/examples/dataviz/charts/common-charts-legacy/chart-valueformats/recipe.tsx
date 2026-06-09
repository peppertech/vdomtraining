// @ts-nocheck
import { h } from 'preact';

export const chartValueformatsRecipe = (
  <>
    <ol>
      <li>
        To format the tooltip labels, set
        {" "}
        <b>
          value-formats.
          {" "}
          <i>type</i>
          .tooltip-label
        </b>
        {" "}
        where
        {" "}
        <i>type</i>
        {" "}
        could be 'series', 'group', 'value', 'x', 'y', 'z', etc depending on the type of chart.
      </li>
      <li>
        To set whether or not a value is displayed in the tooltip, set the
        {" "}
        <b>
          value-formats.
          {" "}
          <i>type</i>
          .tooltip-display
        </b>
        {" "}
        to
        {" "}
        <i>'auto'</i>
        {" "}
        or
        {" "}
        <i>'off'</i>
        .
      </li>
    </ol>
  </>
);
