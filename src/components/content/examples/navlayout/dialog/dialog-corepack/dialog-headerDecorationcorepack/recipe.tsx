import { h } from "preact";

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
    Configure the dialog's header decoration by setting
    <code class="prettyprint">header-decoration='on' or 'off'</code>
    in the
    <code class="prettyprint">oj-radioset</code>
    bindings.
  </li>
  <li>
    Configure how to launch the dialog using the
    <code class="prettyprint">opened</code>
    attribute.
  </li>
</ul>`;

export const dialogHeaderDecorationcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
