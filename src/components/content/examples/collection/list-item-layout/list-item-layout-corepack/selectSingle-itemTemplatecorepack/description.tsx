import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A List Item Layout represents layout used for list view item elements.</p><p>
This demo shows how to use an <code>oj-c-list-item-layout</code> inside the
<code>itemTemplate</code> slot of <code>oj-c-select-single</code> to render richer dropdown
options with an avatar, primary text, secondary text, and metadata.</p>`;

export const selectSingleItemTemplatecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
