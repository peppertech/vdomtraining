import { h } from "preact";

const descriptionHtmlText = String.raw`<p>An Action Card is an actionable container rendering related information</p><p>This demo shows content using web components inside Core Pack action cards.</p>`;

export const actionCardContentActionCardcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
