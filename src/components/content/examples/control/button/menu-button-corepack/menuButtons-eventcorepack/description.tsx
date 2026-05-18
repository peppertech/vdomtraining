import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A menu button launches a menu when clicked.</p>This demo shows how menu button selections can be managed by the on-oj-menu-action callback and
the on-oj-menu-selection callback.   This DOM-centric approach may provide easier integration 
with Visual Builder than just using the menu items onAction callbacks shown in all the other demos.`;

export const menuButtonsEventcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
