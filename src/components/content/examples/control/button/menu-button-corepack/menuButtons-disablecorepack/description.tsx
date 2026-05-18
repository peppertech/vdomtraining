import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A menu button launches a menu when clicked.</p>This demo features a JET Menu Button with a menu with an item that is dynamically disabled.`;

export const menuButtonsDisablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
