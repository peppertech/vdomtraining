// @ts-nocheck
import { h } from 'preact';

export const timelineCustomRendererTimelineRecipe = (
  <>
    <ol>
      <li>Create an oj-timeline element with desired attributes specified.</li>
      <li>
        In the itemBubbleContentTemplate slot, add the svg content for the item bubble using the item
        context from the template renderer.
      </li>
      <li>
        Place an oj-c-list-item-layout inside the foreignObject and bind the leading, secondary,
        tertiary, and action slot content to the timeline item data.
      </li>
      <li>For Foreign Objects, the x-value must be adjusted in RTL mode to use negative widths.</li>
    </ol>
  </>
);
