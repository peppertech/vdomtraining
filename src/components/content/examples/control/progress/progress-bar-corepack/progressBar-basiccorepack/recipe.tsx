import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an oj-c-progress-bar element with a defined
    <a href="jsdocs/oj-c.ProgressBar.html#value">value</a>
    attribute.
  </li>
  <li>For an indeterminate oj-c-progress-bar, set the value to -1.</li>
  <li><b>Accessibility</b>: The application is required to populate the aria-label or aria-labelledby attribute with meaningful descriptors.</li>
</ol>`;

export const progressBarBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
