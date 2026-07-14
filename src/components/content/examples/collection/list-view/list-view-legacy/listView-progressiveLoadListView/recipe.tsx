import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'listView', 'basic'); return false;">
      basic oj-list-view demo
    </a>
    for more information about configuring oj-list-view.  Note that the custom
    DataProvider used is only to simulate a delay in fetching data, it should never
    be used in production code.
  </li>
</ul>`;

export const listViewProgressiveLoadListViewRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
