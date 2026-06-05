import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Drawer Layout adds expandable side contents (drawers) alongside some primary content.</p><p>
  These drawers automatically swap 'reflow' and 'overlay' display mode based on width of the page
  and can be placed at the 'start', 'end' or 'bottom' edge.
</p>`;

export const drawerLayoutBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
