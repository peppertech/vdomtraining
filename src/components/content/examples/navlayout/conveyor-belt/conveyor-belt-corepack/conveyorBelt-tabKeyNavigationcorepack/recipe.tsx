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
    on each element in the ConveyorBelt.
  </li>
  <li>
    Set the data-oj-binding-provider attribute to 'none' to notify the framework that particular
    elements or subtrees have no knockout dependencies and can be initialized without a knockout
    applyBindings call. For more information, see
    <a href="jsdocs/CustomElementOverview.html#ce-overview-upgrade-section">
      Upgrading a Custom Element
    </a>.
  </li>
</ol>`;

export const conveyorBeltTabKeyNavigationcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
