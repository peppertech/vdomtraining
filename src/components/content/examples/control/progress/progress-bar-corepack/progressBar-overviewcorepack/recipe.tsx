import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create an oj-c-progress-bar element with a defined
    <a href="jsdocs/oj-c.ProgressBar.html#value">value</a>
    attribute.
  </li>
  <li>
    Look at the
    <a href="#" onclick="demoGoLink(event, 'progressBarCorepack', 'basic'); return false;">Basic demo</a>
    to see how to create determinate and indeterminate progress bars.
  </li>
  <li>For an embedded oj-c-progress-bar, set the <a href="jsdocs/oj-c.ProgressBar.html#edge">edge</a> attribute to top.</li>
  <li>
    Look at the
    <a href="#" onclick="demoGoLink(event, 'progressBarCorepack', 'loading'); return false;">
      Loading demo
    </a>
    to see how to create a progress bar that represents the loading state of another element/region on the page in an accessible manner.
  </li>
</ol>`;

export const progressBarOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
