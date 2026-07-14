import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an oj-c-progress-circle element with a defined
    <a href="jsdocs/oj-c.ProgressCircle.html#value">value</a>
    attribute.
  </li>
  <li>
    Look at the
    <a href="#" onclick="demoGoLink(event, 'progressCircleCorepack', 'basic'); return false;">
      Basic demo
    </a>
    to see how to create determinate and indeterminate progress circles.
  </li>
  <li>
    The size of the oj-c-progress-circle can be configured by setting
    <a href="jsdocs/oj-c.ProgressCircle.html#size">size</a>
    to 'sm', 'md' (default) or 'lg'.
  </li>
  <li>
    Look at the
    <a href="#" onclick="demoGoLink(event, 'progressCircleCorepack', 'loading'); return false;">
      Loading demo
    </a>
    to see how to create a progress circle that represents the loading state of another element/region on the page in an accessible manner.
  </li>
</ol>`;

export const progressCircleOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
