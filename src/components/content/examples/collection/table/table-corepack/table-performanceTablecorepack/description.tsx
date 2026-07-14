import 'preact';

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p><p>
   This demo shows oj-c-table performance metrics when rendering data sets of different sizes with no templates or renderers. Note the oj-c-table only supports load more on scroll, so initial render times should be similar.
</p>`;

export const tablePerformanceTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
