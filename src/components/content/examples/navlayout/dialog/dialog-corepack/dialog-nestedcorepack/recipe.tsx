import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the oj-c-dialog element to create a
    <code class="prettyprint">dialog</code>
    component.
  </li>
  <li>
    Create a child element with with
    <code class="prettyprint">slot='body'</code>, and define your body content within this element.
  </li>
  <li>
    Configure how to launch the dialog using the
    <code class="prettyprint">opened</code>
    attribute.
  </li>
  <li>
    Use the oj-c-dialog element to create a nested
    <code class="prettyprint">dialog</code>
    component.
  </li>
  <li>
    Define a way to launch the nested dialog from within the main dialog.
    <br />
    In this demo, we have defined a button within the main dialog that will launch the nested
    dialog.
  </li>
</ul>`;

export const dialogNestedcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
