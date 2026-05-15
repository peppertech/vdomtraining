import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Inside the
    <code class="prettyprint">oj-c-button</code>
    element content can be added, like text or icon-font. Supply the label at create time either via the label property, 
    a text node (as shown in Button Text 1), or via an
    <code class="prettyprint">oj-bind-text</code>
    to generate label with resolved expression (as shown in Button Text 2).
  </li>
  <li>
    Use
    <code class="prettyprint">display</code>
    attribute and
    <code class="prettyprint">slots</code>
    to create Icon button. 
    <ul>
      <li>Note that the icon-only button display the label in a tooltip.</li>
    </ul>
  </li>
  <li>
    Use
    <code class="prettyprint">disabled</code>
    attribute to disable button.
    <code>oj-c-button</code>
    is enabled by default, set
    <code>disabled</code>
    for disabled button.
  </li>
  <li>
    Use
    <code class="prettyprint">chroming</code>
    attribute to define button chroming value. 
    <ul>
      <li>chroming value works for Icon button in the same way.</li>
    </ul>
  </li>
  <li>
    Use the size property to modify the size of the button.
  </li>
  <li>
    Use the width property to modify the width of the button.
  </li>
  <li>
    Use the tooltip property to specify the tooltip of the button.
  </li>
</ul>`;

export const buttonsPushButtoncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
