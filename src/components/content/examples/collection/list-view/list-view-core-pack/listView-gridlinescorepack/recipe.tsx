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
    Create a
    <code>Gridlines</code>
    object that specifies whether the horizontal grid lines should be visible.
  </li>
  <li>
    Bind the
    <code>gridlines</code>
    attribute to the
    <code>Gridline</code>.
  </li>
</ul>`;

export const listViewGridlinescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
