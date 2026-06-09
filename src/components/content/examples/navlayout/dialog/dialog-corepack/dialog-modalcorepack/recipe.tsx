import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the
    <code class="prettyprint">oj-c-dialog</code>
    custom element to create a
    <code class="prettyprint">dialog</code>
    component.
  </li>
  <li>
    Define the dialog body content:
    <br />
    Create a child element with
    <code class="prettyprint">slot='body'</code>, and define your body content within this element.
  </li>
  <li>
    Define the dialog footer content:
    <ul>
      <li>
        Create a child element with
        <code class="prettyprint">slot='footer'</code>
        and define your footer content within this element.
      </li>
      <li>
        Define buttons with actions within the footer: In this demo, clicking on the "OK" button
        will close the dialog. This is implemented by calling
        <code class="prettyprint">dialog.close()</code>
        within the button's click handler.
      </li>
    </ul>
  </li>
  <li>
    Use the optional
    <code class="prettyprint">aria-describedby</code>
    attribute to specify content that should be read by screen readers as the dialog description.
  </li>
  oj-c-dialog
  <li>
    By default the dialog modality is set to
    <code class="prettyprint">modality="modal"</code>
    in the oj-c-dialog.
  </li>
</ul>`;

export const dialogModalcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
