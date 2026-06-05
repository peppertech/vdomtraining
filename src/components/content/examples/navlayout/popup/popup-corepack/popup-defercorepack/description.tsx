import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A popup temporarily 'pops up' content in the foreground.</p><p>
  Demonstrates using popup deferred content rendering. Content components of the popup will
  deferring evaluation of bindings until the popup is open. This technique can increase page
  performance.
</p>`;

export const popupDefercorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
