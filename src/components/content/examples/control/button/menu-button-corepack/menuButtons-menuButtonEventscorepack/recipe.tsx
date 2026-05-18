import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    It is possible to track DOM events related to JET Menu Button by registering a document-level
    event listener.
  </li>
  <li>
    In the event handler, use the <code>PopupUtils.isLogicalAncestor</code> utility function to check
    whether the event target is an element logically associated with the Menu Button, i. e. if it's
    a menu or submenu or their items.
  </li>
</ol>`;

export const menuButtonsMenuButtonEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
