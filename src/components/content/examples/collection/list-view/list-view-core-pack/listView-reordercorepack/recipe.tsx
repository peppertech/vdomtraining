import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'listViewCorepack', 'basic'); return false;">
      basic oj-c-list-view demo
    </a>
    for more information about configuring oj-c-list-view.  
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
    Use
    <code>oj-c-drag-handle</code>
    component to show drag icon.
  </li>
  <li>
    Create an 
    <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions">
      ARIA live region
    </a>
    to announce the item reordering.
  </li>
</ul>`;

export const listViewReordercorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
