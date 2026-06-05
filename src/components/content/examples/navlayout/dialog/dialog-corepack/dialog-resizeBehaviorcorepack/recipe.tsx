import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the oj-c-dialog element to create a
    <code class="prettyprint">dialog</code>
    component.
  </li>
  <li>
    Create a child element with with
    <code class="prettyprint">slot='body'</code>
    , and define your body content within this element.
  </li>
  <li>
    Configure how to launch the dialog:
    <ul>
      <li>
        Call the dialog's
        <code class="prettyprint">open</code>
        method to open the dialog.
      </li>
    </ul>
  </li>
  <li>
    Configure the dialog's resize behavior by setting
    <code class="prettyprint">resize-behavior: "resizable" or "none"</code>
    in the oj-c-dialog element.
  </li>
</ul>`;

export const dialogResizeBehaviorcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
