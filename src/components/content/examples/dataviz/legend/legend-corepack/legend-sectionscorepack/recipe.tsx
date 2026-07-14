import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Set the color and shape of the legend items using the  <a target="_blank" href="jsdocs/oj.ColorAttributeGroupHandler.html">ColorAttributeGroupHandler</a> and  <a target="_blank" href="jsdocs/oj.ShapeAttributeGroupHandler.html">ShapeAttributeGroupHandler</a> respectively.
  </li>
  <li>
    When using the legend with other visualisation use the same color and shape handlers for them.
  </li>
  <li>
    Specify Legend data by passing a TreeDataProvider to the
    <i><b>data</b></i>
    attribute.
  </li>
  <li>Leaf nodes will be treated as items, all other nodes will be treated as sections.</li>
  <li>
    Configure sections by providing an oj-c-legend-section element in the sectionTemplate
    slot.
  </li>
  <li>
    Configure the text styling for all the section using the
    <i><b>text-style</b></i>,
    <i><b>section-title-halign</b></i>
    and
    <i><b>section-title-style</b></i>
    attributes.
  </li>
</ol>`;

export const legendSectionscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
