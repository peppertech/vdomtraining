// @ts-nocheck
import { h } from 'preact';

export const popupTailAdjustPositionRecipe = (
  <>
    <ol>
      <li>
        Speicify the position of the popup relative to its anchor element using the
        <code className={"prettyprint"}>position.my</code>
        and
        <code className={"prettyprint"}>position.at</code>
        attributes.
      </li>
      <li>
        Set the
        <code className={"prettyprint"}>tail</code>
        property value to
        <code className={"prettyprint"}>simple</code>
        to enable the optional theme-specific decoration at the anchor point.
      </li>
    </ol>
  </>
);
