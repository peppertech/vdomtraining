import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
    <li>Create a template element with the slot attribute set to <a href="jsdocs/oj-c.MeterCircle.html#centerTemplate">
      <i><b>centerTemplate</b></i>
      </a>.
    </li>
    <li>Populate the template element with the desired HTML content.</li>
    <li>Template content will have access to a CenterContext via the $current property as well as via any data-oj-as alias provided on the template element.</li>
    <li>
      The HTML element passed in will block interactivity in the center of the meter circle by default, but
      the CSS
      <b>pointer-events</b>
      property can be set to 'none' on this element if the meter circle's interactivity is desired.
    </li>
    <li><b>Accessibility</b>: Applications are required to include information conveyed by visible text in their center content for screen readers to make their component accessible. See the <a href="jsdocs/oj-c.MeterCircle.html#a11y-section">
      <i><b>Accessibility doc</b></i>
    </a> for more details.</li>
  </ol>`;

export const meterCircleCenterContentcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
