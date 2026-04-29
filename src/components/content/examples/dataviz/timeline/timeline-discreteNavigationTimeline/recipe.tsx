// @ts-nocheck
import { h } from 'preact';

export const timelineDiscreteNavigationTimelineRecipe = (
  <>
    <ul>
      <li>
        Set the
        <i><b>viewport-navigation-mode</b></i>
        to 'discrete' or 'continuous' (default)
      </li>
      <li>
        Make sure the
        <i><b>viewport-start</b></i>
        and
        <i><b>viewport-end</b></i>
        values are set properly to define the viewport dimensions. This will also set the discrete
        viewport duration width.
      </li>
      <li>
        Set the
        <i><b>start</b></i>
        and
        <i><b>end</b></i>
        values to have a small buffer (e.g. Dec 15, 2012 - Jan 15, 2014 vs Jan 1, 2013 - Dec 31, 2013).
        This will improve performance for discrete viewport-navigation-mode.
      </li>
      <li>
        If you want to change the item-type, set
        <i><b>item-type</b></i>
        attribute to 'duration-event' in the
        <i><b>oj-timeline-item</b></i>
        under
        <i><b>item-template</b></i>
        .
      </li>
      <li>
        Note that there must be an end date in the data if you want to use item-types that are not
        'event'.
      </li>
    </ul>
  </>
);
