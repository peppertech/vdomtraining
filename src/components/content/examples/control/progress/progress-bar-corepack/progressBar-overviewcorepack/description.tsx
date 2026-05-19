import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A progress bar allows the user to visualize the progression of an extended computer operation.</p>This demo shows some of the more important visual aspects of
<code>oj-c-progress-bar</code>.`;

export const progressBarOverviewcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
