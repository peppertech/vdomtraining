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
    Specify
    <code class="prettyprint">tabindex="0"</code>
    on the conveyor belt so that it can receive focus and keyboard events.
  </li>
</ol>`;

export const conveyorBeltKeyboardScrollingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
