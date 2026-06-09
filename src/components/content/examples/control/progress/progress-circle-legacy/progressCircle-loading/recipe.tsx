// @ts-nocheck
import { h } from 'preact';

export const progressCircleLoadingRecipe = (
  <>
    If the oj-progress-circle is describing the loading process of a particular region on the page
    follow the following steps to ensure accessibility.
    <ol>
      <li>
        Add the
        {" "}
        <code>aria-describedby</code>
        {" "}
        attribute to the region and set it to the id of the oj-progress-circle
      </li>
      <li>
        Add the
        {" "}
        <code>aria-busy</code>
        {" "}
        attribute to the region and set it to true.
      </li>
      <li>Make sure to update or remove these attributes once the loading is complete.</li>
    </ol>
  </>
);
