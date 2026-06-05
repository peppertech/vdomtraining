import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Drawer Layout adds expandable side contents (drawers) alongside some primary content.</p><p>
  Drawer Layout supports 'ojBeforeClose' event that can be canceled synchronously or asynchronously.
  Available only in overlay mode.
</p>
<p>
  It is only triggered when closing using 'ESC' key. Not triggered when mutating
  <code class="prettyprint">&lt;edge>-opened</code>
  property explicitly.
</p>
<p>
  This demo shows how to listen for drawer's event:
  <code class="prettyprint">ojBeforeClose</code>
  .
</p>`;

export const drawerLayoutCancelableEventscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
