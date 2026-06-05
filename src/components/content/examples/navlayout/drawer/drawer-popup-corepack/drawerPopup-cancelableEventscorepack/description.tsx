import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Drawer Popup is a panel that slides into the viewport.</p><p>
  Drawer Popup supports 'ojBeforeClose' event that can be canceled synchronously or asynchronously.
</p>
<p>
  It is only triggered when closing using 'ESC' key or Auto Dismiss. Not triggered when mutating
  <code class="prettyprint">&lt;edge>-opened</code>
  property explicitly.
</p>
<p>
  This demo shows how to listen for drawer's event:
  <code class="prettyprint">ojBeforeClose</code>
  .
</p>`;

export const drawerPopupCancelableEventscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
