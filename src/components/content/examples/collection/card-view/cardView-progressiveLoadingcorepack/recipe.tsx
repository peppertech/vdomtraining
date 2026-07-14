import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'cardViewCorepack', 'basic'); return false;">
      basic oj-c-card-view demo
    </a>
    for more information about configuring oj-c-card-view.  Note that the custom
    DataProvider used is only to simulate a delay in fetching data, it should never
    be used in production code.
  </li>
</ul>`;

export const cardViewProgressiveLoadingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
