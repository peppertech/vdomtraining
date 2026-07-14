import 'preact';

export const progressBarLoadingRecipe = (
  <>
    <p>
      If the <code>oj-progress-bar</code> is describing the loading process of a particular region
      on the page, follow these steps to ensure accessibility.
    </p>
    <ol>
      <li>
        Add the <code>aria-describedby</code> attribute to the region and set it to the id of the
        progress bar.
      </li>
      <li>
        Add the <code>aria-busy</code> attribute to the region and set it to true.
      </li>
      <li>Update or remove these attributes once the loading is complete.</li>
    </ol>
  </>
);
