import 'preact';

const recipeHtmlText = String.raw`HTML Markup:
<ol>
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
  <li>
    If it is necessary to override the default theme behaviour, set the
    <code class="prettyprint">arrow-visibility</code>
    property to
    <ol>
      <li>
        <code class="prettyprint">visible</code>
        - arrows are visible
      </li>
      <li>
        <code class="prettyprint">hidden</code>
        - arrows are hidden
      </li>
      <li>
        <code class="prettyprint">auto</code>
        - arrows are visible on desktop, and hidden on mobile
      </li>
    </ol>
  </li>
</ol>`;

export const conveyorBeltConveyorArrowsVisibilitycorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
