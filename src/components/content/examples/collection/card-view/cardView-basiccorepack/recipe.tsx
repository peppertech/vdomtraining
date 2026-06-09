import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
    <li>
      Create an
      <code class="prettyprint">oj-c-card-view</code>
      element.
    </li>
    <li>
      Create a
      <code>MutableArrayDataProvider</code>
      from an array, each item contains an object with the required
      <code>value</code>
      and
      <code>label</code>
      fields.
    </li>
    <li>
      Bind the
      <code>data</code>
      attribute to the
      <code>MutableArrayDataProvider</code>.
    </li>
    <li>
      Specify the card and its content in the itemTemplate slot.
    </li>
  </ul>`;

export const cardViewBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
