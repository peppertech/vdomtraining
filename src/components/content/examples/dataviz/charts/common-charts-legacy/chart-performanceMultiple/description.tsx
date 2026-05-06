// @ts-nocheck
import { h } from 'preact';

export const chartPerformanceMultipleDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>
      Interact with the controls below to experiment with how JET Charts perform when processing data
      sets of different sizes, as well as a large number of charts displaying on one page. Make sure to
      hit Regenerate data for the changes to take place.
    </p>
    <p><b>Best Practices</b></p>
    <ul>
      <li>
        <b>Animation:</b>
        When using large data sets, consider disabling animation indicators or disabling animation
        altogether.
      </li>
      <li>
        <b>Chart Type:</b>
        Consider best view type based on data density. For example, bar charts become less readable when
        there are many groups.
      </li>
      <li>
        <b>Tracking Resize:</b>
        When large numbers of instances are used, consider disabling resize tracking, which adds a small
        overhead to the initial render.
      </li>
    </ul>
  </>
);
