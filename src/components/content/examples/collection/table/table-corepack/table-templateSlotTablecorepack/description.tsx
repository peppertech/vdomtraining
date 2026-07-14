import 'preact';

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows an oj-c-table with inline templates used to render custom cell, header, and footer content.`;

export const tableTemplateSlotTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
