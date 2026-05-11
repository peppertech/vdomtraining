import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
    <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'cardViewCorepack', 'basic'); return false;">
      basic oj-c-card-view demo
    </a>
    for more information about configuring oj-c-card-view.  
  </li>
    <li>
      Use the
      <code>reorderable.items</code>
      attribute to enable reorder feature.
    </li>
    <li>
      Use
      <code>on-oj-reorder</code>
      attribute to register listener to update data during reorder.
    </li>
    <li>
      Optionally, define a key listener to handle cut and paste of item using specific keystrokes. Cut and paste support is optional, as there is built in keyboard support for reordering using Shift+Cmd/Ctrl+Arrow.
    </li>
    <li>
      Use
      <code>oj-c-drag-handle</code>
      component to show drag icon.
    </li>
    <li>
      Create an 
      <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions">
        ARIA live region
      </a>
      to announce the card reordering.
    </li>
  </ul>`;

export const cardViewReordercorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
