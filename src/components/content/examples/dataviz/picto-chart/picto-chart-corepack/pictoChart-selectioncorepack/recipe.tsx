// @ts-nocheck
import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Set the
    <i><b>selection-mode</b></i>
    attribute to either
    <i>'none'</i>,
    <i>'single'</i>, or
    <i>'multiple'</i>.
  </li>
  <li>
    Initially select items by passing them to the
    <i><b>selection</b></i>
    attribute.
  </li>
  <li>
    To catch and process events triggered by the selection/de-selection of an item, initialize the
    component with an
    <i>on-selection-changed</i>
    callback. See documentation for more detail.
  </li>
</ul>`;

export const pictoChartSelectioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
