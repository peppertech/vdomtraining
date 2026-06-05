import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Drawer Layout adds expandable side contents (drawers) alongside some primary content.</p><p>
  This demo shows how to create a fixed header inside of a drawer and how to make a drawer scroll
  separately.
</p>`;

export const drawerLayoutInsetLayoutcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
