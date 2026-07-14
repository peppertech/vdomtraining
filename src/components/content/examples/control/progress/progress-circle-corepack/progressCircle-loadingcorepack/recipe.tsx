import 'preact';

const recipeHtmlText = String.raw`If the oj-c-progress-circle is describing the loading process of a particular region on the page 
follow the steps below to ensure accessibility.
<ol>
  <li>
    Add the
    <code>aria-describedby</code>
    attribute to the region and set it to the id of the oj-c-progress-circle
  </li>
  <li>
    Add the
    <code>aria-busy</code>
    attribute to the region and set it to true.
  </li>
  <li>Make sure to update or remove these attributes once the loading is complete.</li>
  <li><b>Accessibility</b>: The application is required to populate the aria-label or aria-labelledby attribute with meaningful descriptors.</li>
</ol>`;

export const progressCircleLoadingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);
