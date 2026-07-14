import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an oj-c-progress-circle element with a defined
    <a href="jsdocs/oj-c.ProgressCircle.html#value">value</a>
    attribute.
  </li>
  <li>For an indeterminate oj-c-progress-circle, set the value to -1.</li>
  <li><b>Accessibility</b>: The application is required to populate the aria-label or aria-labelledby attribute with meaningful descriptors.</li>
</ol>`;

export const progressCircleBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
