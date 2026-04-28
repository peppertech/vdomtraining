// @ts-nocheck
import { h } from 'preact';

export const sunburstPopupRecipe = (
  <>
    <ul>
      <li>
        To trigger a popup on the nodes, register a DOM listener on the sunburst that will selectively
        open an oj-popup.
      </li>
      <li>
        For the non keyboard use case, the listener can determine whether to open the popup by analyzing
        the target which can be done by passing the event's target to the component
        <i><b>getContextByNode</b></i>
        API.
      </li>
      <li>
        For the keyboard use case, set
        <b><i>selection-mode</i></b>
        to 'single' and use the
        <b><i>selection</i></b>
        API to determine the focused target. This is required for the popup interaction to be fully
        accessible.
      </li>
      <li>
        The sunburst's tooltips should be turned off via the
        <b><i>tooltip.renderer</i></b>
        attribute by passing a function that returns null.
      </li>
    </ul>
  </>
);
