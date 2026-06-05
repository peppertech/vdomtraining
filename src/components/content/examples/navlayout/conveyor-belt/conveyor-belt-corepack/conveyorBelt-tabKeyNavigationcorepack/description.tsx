import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A conveyor belt manages overflow for its child elements and allows scrolling among them.</p>This demo showcases scrolling a conveyor belt via tab navigation. This is demonstrated by adding
keyboard tab navigation to items in a conveyor belt that were previously unreachable via tabbing.`;

export const conveyorBeltTabKeyNavigationcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
