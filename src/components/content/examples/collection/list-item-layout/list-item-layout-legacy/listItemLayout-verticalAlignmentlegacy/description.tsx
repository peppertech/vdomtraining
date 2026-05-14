import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A List Item Layout represents layout used for list view item elements.</p>The demo shows how to render layout content using the vertical alignment property to render cell content vertically aligned to the top.
Overline slot remains above default content. Quaternary and navigation remain unchanged.`;

export const listItemLayoutVerticalAlignmentlegacyDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
