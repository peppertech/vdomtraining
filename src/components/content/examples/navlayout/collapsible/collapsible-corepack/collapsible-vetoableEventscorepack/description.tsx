import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A collapsible displays a header that can be expanded to show its content.</p>Expansion and collapse events can be vetoed by calling event.preventDefault() in the listeners.`;

export const collapsibleVetoableEventscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
