import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A CardView displays data items as a grid with highly interactive features.</p>This demo shows the usage of custom skeleton for the card for the initial loading and load more indicator in oj-c-card-view when it takes a long time to load and render the
data.`;

export const cardViewCustomSkeletoncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
