// @ts-nocheck
import 'preact';

export const chartPopupRecipe = (
  <>
    <ol>
      <li>
        To trigger a popup on the data items, register DOM listeners on the chart that will selectively
        open an oj-popup.
      </li>
      <li>
        Set
        {" "}
        <b><i>selection-mode</i></b>
        {" "}
        to 'single' and use the
        {" "}
        <b><i>selection</i></b>
        {" "}
        API to determine the focused target. This should be done and is required for the pop up
        interaction to be fully accessible.
      </li>
      <li>
        The chart's default tooltips should be turned off via the
        {" "}
        <b><i>tooltip.renderer</i></b>
        {" "}
        attribute by passing a function that returns null.
      </li>
    </ol>
  </>
);
