// @ts-nocheck
import { h } from 'preact';

export const thematicMapRendererRecipe = (
  <>
    <ul>
      <li>
        To create custom SVG content for a data item, provide a function callback to the
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#renderer"}><code>renderer</code></a>
        attribute.
      </li>
      <li>
        To customize hover, selection and keyboard focus effects for the data item with custom content,
        callback functions can be provided using the
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#hoverRenderer"}>
          <code>hover-renderer</code>
        </a>
        ,&nbsp;
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#selectionRenderer"}>
          <code>selection-renderer</code>
        </a>
        and
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#focusRenderer"}>
          <code>focus-renderer</code>
        </a>
        attributes. These functions are called when the data item's state has changed, and they apply or
        remove any hover/selection effects based on the passed in data item's state.
      </li>
      <li>
        The
        <code>location</code>
        or
        <code>x</code>
        and
        <code>y</code>
        properties of a marker object will be used to determine the item placement within the Thematic
        Map. The
        <code>short-desc</code>
        attribute will be used for accessibility. No other existing marker attributes will be used by
        the Thematic Map when a custom renderer is provided.
      </li>
      <li>
        Keyboarding: Navigate the data using the standard Thematic Map keyboard shortcuts for data
        items.
      </li>
    </ul>
  </>
);
