// @ts-nocheck
import { h } from 'preact';

export const timelineValueFormatsRecipe = (
  <>
    <ol>
      <li>
        To format the tooltip labels, set
        <b>
          value-formats.
          <i>type</i>
          .tooltip-label
        </b>
        where
        <i>type</i>
        could be 'series', 'start', 'end', 'date', 'title', 'description', etc. See the
        <a target={"_blank"} href={"jsdocs/oj.ojTimeline.html#valueFormats"}>API doc</a>
        for more details.
      </li>
      <li>
        To set whether or not a value is displayed in the tooltip, set the
        <b>
          value-formats.
          <i>type</i>
          .tooltip-display
        </b>
        to
        <i>'auto'</i>
        or
        <i>'off'</i>
        .
      </li>
      <li>
        To use a date converter in the tooltip, set the
        <b>
          value-formats.
          <i>type</i>
          .converter
        </b>
        The only values for type that support converters are 'date', 'end', and 'start'.
      </li>
    </ol>
  </>
);
