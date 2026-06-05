import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A conveyor belt manages overflow for its child elements and allows scrolling among them.</p>This demo showcases stretching a child element height to the height of the conveyor belt.`;

export const conveyorBeltConveyorElementStretchcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
