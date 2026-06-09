// @ts-nocheck
import { h } from 'preact';

export const timelineDurationEventBackgroundRecipe = (
  <>
    <ol>
      <li>Create an oj-timeline element.</li>
      <li>
        Set the
        {" "}
        <i><b>background</b></i>
        {" "}
        attribute in oj-timeline-item to render background color. If the item-type is
        {" "}
        <i><b>duration-event</b></i>
        , a color stripe will also be rendered.
      </li>
      <li>
        <i><b>Accessibility:</b></i>
        {" "}
        There is an accessibility requirement for use cases where a color difference is used to convey
        information, to add visible text description in addition to the background color.
      </li>
    </ol>
  </>
);
