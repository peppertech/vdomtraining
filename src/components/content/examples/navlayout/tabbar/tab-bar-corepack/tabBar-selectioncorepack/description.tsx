import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tab bar allows navigation between different content sections.</p><p>This demo shows how to monitor when a tab is selected or re-selected using the selection action listener.</p>`;

export const tabBarSelectioncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
