import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  Demonstrates using dialog deferred content rendering. Dialog content will defer evaluation of
  bindings until the dialog is open. This technique can increase page performance.
</p>`;

export const dialogDefercorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
