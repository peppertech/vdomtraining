import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A list view displays data items as a list or a grid with highly interactive features.</p>This demo shows the usage of custom skeleton for the initial loading and load more indicator in oj-c-list-view when it takes a long time to load and render the
data.`;

export const listViewCustomSkeletoncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
