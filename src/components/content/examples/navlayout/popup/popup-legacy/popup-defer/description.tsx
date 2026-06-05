import { h } from "preact";

const descriptionHtmlText = String.raw`<p>
  Demonstrates using popup deferred content rendering. Content components of the popup will
  deferring evaluation of bindings until the popup is open. This technique can increase page
  performance.
</p>`;

export const popupDeferDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
