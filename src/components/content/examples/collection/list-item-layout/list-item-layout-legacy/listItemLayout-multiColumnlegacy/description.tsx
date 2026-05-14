import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A List Item Layout represents layout used for list view item elements.</p><p>
  The demo shows how to use multiple list item layout components to build a multi-column layout. To
  adhere to Redwood design for list items, use the
  <a
    href="https://exchange.oraclecorp.com/ui/index.html?root=view&fullName=oj-sp-list-item-template&descriptiontab=view-tab-readme">
    oj-sp-list-item-template
  </a>
  component instead of this layout.
</p>`;

export const listItemLayoutMultiColumnlegacyDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
