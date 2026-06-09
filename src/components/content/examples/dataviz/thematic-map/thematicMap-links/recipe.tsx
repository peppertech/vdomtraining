// @ts-nocheck
import { h } from 'preact';

export const thematicMapLinksRecipe = (
  <>
    <ul>
      <li>
        <b>Creation</b>
        : Links can be created by passing a DataProvider using the link-data attribute and configured
        with an oj-thematic-map-link element passed in the linkTemplate slot. They can be associated
        with a data item by specifying a marker or area ID for the the link's start-location.id and
        end-location.id attributes. Alternatively, a link's start and end points can be specified using
        {" "}
        <code>location</code>
        {" "}
        or
        {" "}
        <code>x/y</code>
        {" "}
        on start-location and end-location.
      </li>
      <li>
        <b>Overlapping</b>
        : Links with the same start and end points will be rendered with an auto determined amount of
        spacing.
      </li>
    </ul>
  </>
);
