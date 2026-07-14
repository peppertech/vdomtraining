import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the
    <code class="prettyprint">oj-c-dialog</code>
    element to create a
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
    Configure the dialog's cancel behavior by setting
    <code class="prettyprint">cancel-behavior="icon"</code>
    or
    <code class="prettyprint">cancel-behavior="escape"</code>
    or
    <code class="prettyprint">cancel-behavior="none"</code>
    on the
    <code class="prettyprint">oj-c-dialog</code>
    element.
  </li>
</ul>`;

export const dialogCancelBehaviorcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
