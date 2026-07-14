import 'preact';

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p><p>
  This demo shows an oj-c-table with an external filter using the filterCriterion option of the
  ListDataProviderView.
</p>
<p>
  Type some characters in the filter input text field and observe that the oj-c-table only shows
  rows that match the filter.
</p>`;

export const tableFilteringTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
