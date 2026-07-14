import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-list-view</code>
    element.
  </li>
  <li>
    Create an
    <code>MutableArrayDataProvider</code>
    from an array of employee records and set
    <code>keyAttributes</code>
    to the unique
    <code>id</code>
    field.
  </li>
  <li>
    Bind the
    <code>data</code>
    attribute to the
    <code>MutableArrayDataProvider</code>.
  </li>
</ul>`;

export const listViewBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
