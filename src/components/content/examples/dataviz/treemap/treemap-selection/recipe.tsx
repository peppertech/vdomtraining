// @ts-nocheck
import { h } from 'preact';

export const treemapSelectionRecipe = (
  <>
    <ol>
      <li>
        Set
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        to either
        {" "}
        <i>'none'</i>
        ,
        <i>'single'</i>
        , or
        {" "}
        <i>'multiple'</i>
        .
      </li>
      <li>
        Initially select nodes by passing them to the
        {" "}
        <i><b>selection</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To catch and process events triggered by the selection/de-selection of a node, listen to changes
        in the selection observable or set a listener with the
        {" "}
        <i>on-selection-changed</i>
        {" "}
        attribute.
      </li>
    </ol>
  </>
);
