import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A toolbar displays a strip of control elements such as buttons and menu buttons, often grouped by separators.</p>This demo shows how a toolbar can control the actions and events of its content.`;

export const toolbarItemActionscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
