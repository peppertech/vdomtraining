// @ts-nocheck
import 'preact';

export const timelineMoveResizeDurationTimelineDescription = (
  <>
    <p>A timeline is an interactive data visualization that displays a series of events in chronological order.</p><p>
      This demo shows a JET timeline using discrete viewport-navigation-mode with various item-types.
      JET Timeline supports discrete viewport-navigation-mode which sets a fixed duration as the
      viewport and allows the users to navigate between viewports via the navigation arrows or using
      shift + pgup/pgdown. Note that the discrete viewport-navigation-mode is only available in Redwood
      theme and when using the horizontal orientation. Try using the different item-types to see how JET
      Timeline displays the item data in different forms. The supported values are:
    </p>

    <ul>
      <li>
        auto (default behavior): event item-type if end date not specified, and duration-event if end
        date specified.
      </li>
      <li>event: item bubble using only the start date</li>
      <li>
        duration-event: item bubble with width equal to the duration and edges of the event matching the
        start/end date (only available on horizontal timeline)
      </li>
    </ul>
  </>
);
