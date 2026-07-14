import 'preact';

const descriptionHtmlText = String.raw`<p>A progress bar allows the user to visualize the progression of an extended computer operation.</p>This demo shows how to create an oj-c-progress-bar when it represents the loading state of another element on the page. 
Follow the recipe to understand how to use the 
<code>aria-describedby</code>
to link the loading element/region and the oj-c-progress-bar and use 
<code>aria-busy</code>
attributes for accessibility.`;

export const progressBarLoadingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
