import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>A user-defined header can be created by using the dialog's header slot.</p>
When creating user-defined headers:
<ul>
  <li>Embed your header content within the header slot.</li>
  <li>Ensure that your header contains a title element.</li>
</ul>`;

export const dialogUserDefinedHeadercorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
