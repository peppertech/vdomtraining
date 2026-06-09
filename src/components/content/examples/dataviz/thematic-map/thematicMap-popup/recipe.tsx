// @ts-nocheck
import { h } from 'preact';

export const thematicMapPopupRecipe = (
  <>
    <ul>
      <li>
        To trigger a popup on data items, register a DOM listener on the component that will selectively
        open an oj-popup element.
      </li>
      <li>
        For the non keyboard use case, the listener can determine whether to open the popup by analyzing
        the hover target which can be done by passing the event's target to the component
        {" "}
        <code>getContextByNode</code>
        {" "}
        API.
      </li>
      <li>
        For the keyboard use case, set
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
        The component's default tooltips should be turned off via the
        {" "}
        <code>tooltip-display</code>
        {" "}
        attribute.
      </li>
    </ul>
  </>
);
