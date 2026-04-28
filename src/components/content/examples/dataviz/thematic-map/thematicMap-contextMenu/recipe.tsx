// @ts-nocheck
import { h } from 'preact';

export const thematicMapContextMenuRecipe = (
  <>
    <ul>
      <li>
        To trigger a context menu on Thematic Map data items, create an oj-menu element as a child of
        the oj-thematic-map element.
      </li>
      <li>Specify a slot attribute with value 'contextMenu' on the oj-menu element.</li>
      <li>
        For the non keyboard use case, use the
        <code>getContextByNode</code>
        method to determine the object that triggered the context menu. The structure of the returned
        context object is described in the
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#getContextByNode"}>API doc</a>
        .
      </li>
      <li>
        For the keyboard use case, set
        <b><i>selection-mode</i></b>
        to 'single' and use the
        <b><i>selection</i></b>
        API to determine the object that triggered the context menu. This should be done and is required
        for the context menu interaction to be fully accessible.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        <code>shortDesc</code>
        properties of data items with meaningful descriptors as the Thematic Map component does not
        provide any default descriptors.
      </li>
    </ul>
  </>
);
