import 'preact';

const recipeHtmlText = String.raw`<ul>
    <li>
      Construct a
      <code>RESTDataProvider</code>
      as shown. Make sure to specify the
      <code>keyAttributes</code>
      option.
    </li>
    <li>
      Create an
      <code class="prettyprint">oj-c-card-view</code>
      element.
    </li>
    <li>
      Bind the
      <code>data</code>
      attribute to the
      <code>RESTDataProvider</code>
      that you created previously.
    </li>
    <li>
      Use the
      <code>scroll-policy-options.fetch-size</code>
      attribute to explicitly specify a fetch size.
    </li>
    <li>
      Specify the card and its content in the itemTemplate slot.
    </li>
  </ul>`;

export const cardViewLoadMoreOnScrollcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
