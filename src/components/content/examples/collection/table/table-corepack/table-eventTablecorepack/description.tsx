import 'preact';

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows the supported events published by the oj-c-table. Interact with it to see selection, current-cell, and row-action events.`;

export const tableEventTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
