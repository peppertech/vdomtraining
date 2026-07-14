import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a meter circle by using the oj-meter-circle tag with the
    <i><b>value</b></i>
    attribute defined.
  </li>
  <li>
    Choose the size of the meter circle with the
    <i><b>size</b></i>
    attribute.
  </li>
  <li>
    Cutomize the size of the indicator bar of circular meter circle bar using the
    <i><b>indicator-size</b></i>
    attribute.
  </li>
  <li>
    Cutomize the width of the circular meter circle bar using the
    <i><b>inner-radius</b></i>
    attribute.
  </li>
  <li>
    Cutomize the color of the indicator bar circular meter circle bar using the
    <i><b>color</b></i>
    attribute.
  </li>
  <li>
    <b>Accessibility</b> : If you are using indicatorColor, applications are responsible for making sure that the color meets the 
    <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum">minimum contrast ratio</a>.
  </li>
</ol>`;

export const meterCircleCustomizationcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
