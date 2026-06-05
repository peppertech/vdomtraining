import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Drawer Popup is a panel that slides into the viewport.</p><p>
  Drawer Popup always overlays the page and can be placed at the 'start', 'end' or 'bottom' edge and it always overlays the page.
</p>`;

export const drawerPopupBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
