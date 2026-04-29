// @ts-nocheck
import { h } from 'preact';

export const timelineDateFormatsTimelineDescription = (
  <>
    <p>A timeline is an interactive data visualization that displays a series of events in chronological order.</p><p className={"oj-typography-body-sm"}>
      <span className={"oj-typography-body-sm"}>
        The Timeline supports a simplified version of the ISO 8601 extended date/time format. The format
        is as follows:
        <span className={"demo-timeline-dateformat"}>YYYY-MM-DDTHH:mm:ss.sssZ</span>
        .
        <br />
        In addition to ISO the following notations are allowed:
      </span>
    </p>
    <ul>
      <li>
        <span className={"oj-typography-body-sm"}>
          <span className={"demo-timeline-dateformat"}>MM/DD/YYYY</span>
          , example: "02/10/2013"
        </span>
      </li>
      <li>
        <span className={"oj-typography-body-sm"}>
          <span className={"demo-timeline-dateformat"}>MMM DD, YYYY</span>
          , example: "Feb 17, 2013"
        </span>
      </li>
      <li>
        <span className={"oj-typography-body-sm"}>
          <span className={"demo-timeline-dateformat"}>MM, DD, YYYY</span>
          , example: "02, 17, 2013"
        </span>
      </li>
    </ul>
    <p className={"oj-typography-body-sm"}>
      <span className={"oj-typography-body-sm"}>
        Take a look at the json data to see the different examples being used.
      </span>
    </p>
  </>
);
