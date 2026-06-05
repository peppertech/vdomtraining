import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tab bar allows navigation between different content sections.</p><p>The CoreRouter is a ground-up rewrite of the JET router, and is intended to be simpler to use, pluggable, and less dependent on other JET modules.</p>

<p>This demo uses a simple configuration of the Router to enable tab switching to update the contents of a panel using the pluggable KnockoutRouterAdapter.</p>`;

export const tabBarRoutingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
