// @ts-nocheck
import 'preact';

export const chartDataCursorRecipe = (
  <>
    <ol>
      <li>
        Set
        {" "}
        <i><b>data-cursor</b></i>
        {" "}
        to
        {" "}
        <i>'on'</i>
        {" "}
        to enable the data cursor. If set to
        {" "}
        <i>'auto'</i>
        , the data cursor will appear automatically on touch devices.
      </li>
      <li>
        Set
        {" "}
        <i><b>data-cursor-behavior</b></i>
        {" "}
        to
        {" "}
        <i>'smooth'</i>
        {" "}
        to make the data cursor follow the mouse/touch movement smoothly, or
        {" "}
        <i>'snap'</i>
        {" "}
        to make it snap to the data items.
      </li>
    </ol>
  </>
);
