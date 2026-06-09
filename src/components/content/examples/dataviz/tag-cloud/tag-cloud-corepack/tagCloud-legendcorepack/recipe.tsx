import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an oj-c-legend component and populate its sections and items with information that
    corresponds to the Tag cloud.
  </li>
  <li>
    Use an attribute group handler to set colors on both the Tag cloud
    and legend items
  </li>
  <li>Set the same <i><b>categories</b></i> on your Legend and Tag cloud items.</li>
  <li>Set <i><b>hidden-categories</b></i> on both your Legend and Tag cloud to the same observable value.</li>
  <li>Set <i><b>hide-and-show-behavior</b></i> to on for your Legend.</li>
  <li>
    <b>Accessibility</b>: The application is responsible for populating the
    <i><b>short-desc</b></i>
    attribute of your items with meaningful descriptors. When setting color, applications are responsible for making sure that the color meets the 
    <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum">minimum contrast ratio</a>.
  </li>
</ul>`;

export const tagCloudLegendcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
