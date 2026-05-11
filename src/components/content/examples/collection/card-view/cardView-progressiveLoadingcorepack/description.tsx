import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A CardView displays data items as a grid with highly interactive features.</p>Thie demo shows the initial loading indicator in oj-c-card-view when it takes a long time to load and render the
data. oj-c-card-view only shows the loading indicator after a pre-defined time has elapsed.`;

export const cardViewProgressiveLoadingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
