import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-list-view</code>
    element.
  </li>
  <li>
    Construct a custom
    <code>DataProvider</code>
    that returns suggestion metadata. For example, a custom
    <code>DataProvider</code>
    that works with OARS service (please refer to information in the info section for details). The
    <code>DemoSmartSuggestionsDataProvider</code>
    used here is for demo purpose only!
  </li>

  <li>
    Bind the
    <code>data</code>
    attribute to the custom
    <code>DataProvider</code>
    that you created previously.
  </li>
  <li>
    Use the
    <code>itemTemplate</code>
    slot to specify the template for rendering the item.
  </li>
  <li>
    <b>Accessibility:</b>
    Make sure to add information about smart suggestions for screen reader users.
  </li>
</ul>`;

export const listViewSmartSuggestionscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
