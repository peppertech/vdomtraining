import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Use the
    <code class="prettyprint">toolbar-selection</code>
    attribute to set the initial state of selections and values of content.
  </li>
  <li>
    Use the
    <code class="prettyprint">on-toolbar-selection-changed</code>
    used as shown to bind an event listener for when a selection changes within the toolbar.
  </li>
  <li>
    If using a selection group, add an
    <code class="prettyprint">on-oj-toolbar-selection</code>
    handler.
  </li>
  <li>
    Apply the
    <code class="prettyprint">aria-controls</code>
    attribute to the toolbar element or individual toolbar items, as needed, as discussed in the API
    doc.
  </li>
</ol>`;

export const toolbarSelectioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
