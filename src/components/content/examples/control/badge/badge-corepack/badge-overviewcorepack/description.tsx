import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A badge is a label which holds a small amount of information.</p><p>
  Badges are labels which hold small amounts of information such as number of unread messages, or an
  item's status.
</p>
<p>This demo shows how to create badges of various colors and sizes.</p>`;

export const badgeOverviewcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
