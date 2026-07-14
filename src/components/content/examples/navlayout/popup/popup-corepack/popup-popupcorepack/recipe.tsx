import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Insert the
    <code class="prettyprint">oj-c-popup</code>
    element in the view template.
  </li>
  <li>Specify the content to be displayed when the popup is open.</li>
  <li>
    Define an
    <code class="prettyprint">oj-button</code>
    to open the popup when clicked.
  </li>
  <li>
    In the click action handler, set the
    <code class="prettyprint">opened</code>
    property on the popup to <code class="prettyprint">true</code> to open it.
  </li>
</ol>`;

export const popupPopupcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
