import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the oj-c-dialog element to create a
    <code class="prettyprint">dialog</code>
    component.
  </li>
  <li>
    Define the dialog body content:
    <ul>
      <li>
        Create a child element with with
        <code class="prettyprint">slot='body'</code>, and define your body content within this element.
      </li>
    </ul>
  </li>
  <li>
    Define the dialog header content:
    <ul>
      <li>
        Create a child element with the
        <code class="prettyprint">slot='header'</code>
        and define your header content within this element.
      </li>
      <li>
        Note that, in order to meet accessibility requirements, the rendered dialog includes an
        <code class="prettyprint">aria-labelledby</code>
        reference (in the
        <code class="prettyprint">.oj-c-dialog</code>
        element) to the title of the header. This is generated automatically, but relies on having a
        title element that is identified by the
        <code class="prettyprint">.oj-c-dialog-title</code>
        class.
      </li>
    </ul>
  </li>
  <li>
    Configure how to launch the dialog using the
    <code class="prettyprint">opened</code>
    attribute.
  </li>
  <li>
    Configure the cancelbehavior:
    <ul>
      <li>
        The close icon will automatically be generated. If you wish to omit the close icon from your
        header, use
        <code class="prettyprint">cancelBehavior: 'escape'</code>
        or
        <code class="prettyprint">cancelBehavior: 'none'</code>.
      </li>
    </ul>
  </li>
</ul>`;

export const dialogUserDefinedHeadercorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
