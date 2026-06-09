// @ts-nocheck
import { h } from 'preact';

export const chartDragModeDescription = (
  <>
    <p>A chart displays information graphically, making relationships among the data easier to understand.</p><p>
      Drag mode controls what action is performed on the chart when a drag occurs. It is useful when
      multiple drag actions are possible. The possible values are:
    </p>
    <ul>
      <li>
        <b>user:</b>
        {" "}
        Display buttons to let users switch between modes when multiple drag actions are available.
      </li>
      <li>
        <b>pan:</b>
        {" "}
        Pan the chart. Only available if zoom & scroll is turned on.
      </li>
      <li>
        <b>zoom:</b>
        {" "}
        Marquee zoom. Only available if zoom & scroll is turned on.
      </li>
      <li>
        <b>select:</b>
        {" "}
        Marquee select. Only available if multiple selection is turned on.
      </li>
      <li>
        <b>off:</b>
        {" "}
        Perform nothing on drag.
      </li>
    </ul>
  </>
);
