import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>JET Menu Buttons items property can have an item dynamically disabled.</li>
  <li>
    Use computed observables to simplify the disabling an item.
  </li>
</ol>`;

export const menuButtonsDisablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
