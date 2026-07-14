import 'preact';

const descriptionHtmlText = String.raw`<p>A conveyor belt manages overflow for its child elements and allows scrolling among them.</p>This demo showcases a horizontal conveyor belt with an option to change the visibility of overflow
arrows. The initial demo value used here is auto, which means that the arrows are visible on desktop
and are hidden on mobile.`;

export const conveyorBeltConveyorArrowsVisibilitycorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
