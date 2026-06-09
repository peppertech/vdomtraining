// @ts-nocheck
import { h } from 'preact';

export const timelineContextMenuTimelineRecipe = (
  <>
    <ol>
      <li>
        To trigger a context menu on timeline items, create an oj-menu element as a child of oj-timeline
        element.
      </li>
      <li>Specifies a slot attribute with value 'contextMenu' on the oj-menu element.</li>
      <li>
        For the keyboard use case, set
        {" "}
        <b><i>selection-mode</i></b>
        {" "}
        to 'single' and use the
        {" "}
        <b><i>selection</i></b>
        {" "}
        API to determine the object that triggered the context menu. This should be done and is required
        for the context menu interaction to be fully accessible.
      </li>
    </ol>
  </>
);
