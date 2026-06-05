import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A conveyor belt manages overflow for its child elements and allows scrolling among them.</p>This demo shows how to wrap oj-tab-bar inside of oj-c-conveyor-belt to manage overflow of tab-bar
items and allow scrolling among them. This demo shows how to programmatically select a hidden
oj-tab-bar item and make the selection visible in the oj-c-conveyor-belt viewport.`;

export const conveyorBeltProgrammaticScrollingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
