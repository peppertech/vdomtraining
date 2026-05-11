import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows how to associate a custom context menu to a Table and also insert default context menu items amongst the custom menu items.`;

export const tableCustomContextMenuTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
