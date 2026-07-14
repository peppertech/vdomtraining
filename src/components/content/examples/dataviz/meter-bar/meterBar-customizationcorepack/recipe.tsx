import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a Meter bar by using the oj-meter-bar tag with the
    <i><b>value</b></i>
    attribute defined.
  </li>
  <li>
    Choose the size of the Meter bar with the
    <i><b>size</b></i>
    attribute.
  </li>
  <li>
    Change the size of the indicator of Meter bar with the
    <i><b>indicator-size</b></i>
    attribute.
  </li>
  <li>
    Change the color of the indicator of Meter bar with the
    <i><b>color</b></i>
    attribute.
  </li>
  <li>
    <b>Accessibility</b> : If you are using indicatorColor, applications are responsible for making sure that the color meets the 
    <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum">minimum contrast ratio</a>.
  </li>
</ol>`;

export const meterBarCustomizationcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
