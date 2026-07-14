import 'preact';

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or a grid with highly interactive features.</p>This demo shows how to customize content when there is no data in ListView.`;

export const listViewNoDatacorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
