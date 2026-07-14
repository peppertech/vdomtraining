import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>In the HTML, specify a group of sibling elements to be managed by the ConveyorBelt.</li>
  <li>
    Create an
    <code>DataProvider</code>. In this case since data is an
   <code>array</code>,
   use the
   <code>ArrayDataProvider</code>
   to attribute.
  </li>
  <li>
    Specify the <code class="prettyprint">oj-c-conveyor-belt.</code> and its content in the itemTemplate slot.
  </li>
  <li>
    Restrict the width of the
    <code class="prettyprint">oj-c-conveyor-belt</code>
    element as needed, beyond which overflow will be managed by the ConveyorBelt. This demo uses
    responsive grid style classes for the purpose of illustrating use of the ConveyorBelt.
  </li>
</ol>`;

export const conveyorBeltHorizontalConveyorBeltcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
