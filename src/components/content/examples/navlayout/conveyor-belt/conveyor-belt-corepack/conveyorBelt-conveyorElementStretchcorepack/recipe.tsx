import 'preact';

const recipeHtmlText = String.raw`HTML Markup:
<ol>
  <li>
    Please see the
    <a
      href="#"
      onclick="demoGoLink(event, 'conveyorBelt', 'horizontalConveyorBelt'); return false;">
      basic conveyor belt demo
    </a>
    for more information about configuring a basic ConveyorBelt.
  </li>
  <li>
    Set css style
    <code class="prettyprint">height</code>
    on the ConveyorBelt to change the height.
  </li>
  <li>
    Set css style
    <code class="prettyprint">height:100%</code>
    on the element that should be stretched in the ConveyorBelt.
  </li>
</ol>`;

export const conveyorBeltConveyorElementStretchcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
