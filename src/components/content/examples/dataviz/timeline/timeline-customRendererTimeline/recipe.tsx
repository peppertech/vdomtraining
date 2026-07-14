// @ts-nocheck
import 'preact';

export const timelineCustomRendererTimelineRecipe = (
  <>
    <ol>
      <li>Create an oj-timeline element with desired attributes specified.</li>
      <li>
        In the itemBubbleContentTemplate slot, add the svg content for the item bubble using the item
        context from the data-oj-as binding
      </li>
      <li>For Foreign Objects, the x-value must be adjusted in RTL mode to use negative widths.</li>
    </ol>
  </>
);
