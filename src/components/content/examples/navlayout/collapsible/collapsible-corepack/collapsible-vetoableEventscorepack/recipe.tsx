import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Add an event handler for beforeExpand/beforeCollapse as shown.</li>
  <li>In the event handler, call event.preventDefault() to veto the action.</li>
  <li>The collapsible will not open when clicked due to the veto.</li>
</ol>`;

export const collapsibleVetoableEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
