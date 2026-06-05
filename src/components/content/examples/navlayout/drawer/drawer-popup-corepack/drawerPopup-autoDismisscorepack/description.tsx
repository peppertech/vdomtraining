import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Drawer Popup is a panel that slides into the viewport.</p><p>Drawer Popup supports autodismissal.</p>
<p>
  If
  <code class="prettyprint">auto-dismiss</code>
  is set to 'focus-loss' (default), click on the scrim closes the drawer.
</p>`;

export const drawerPopupAutoDismisscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
