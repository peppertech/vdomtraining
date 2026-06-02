import { h } from "preact";

const descriptionHtmlText = String.raw`<p>An Action Card is an actionable container rendering related information</p><p>
  An action card is itself actionable, and responds to the user's click or touch. Child elements of an
  action card cannot be actionable elements themselves, such as a button.
</p>`;

export const actionCardBasicActionCardcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
